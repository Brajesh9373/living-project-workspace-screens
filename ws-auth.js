/* WorkSimplified workspace authentication for the Stitch screens.
   Entry: ?projectId=<id> with the project token in the #pt= fragment.
   The raw token is exchanged once for a short-lived screen token (ws1.*);
   only the screen token is kept (tab session). Every screen must pass this
   gate: no valid project membership -> access screen, no demo content. */
(function () {
  var q = new URLSearchParams(location.search);
  var pid = q.get('projectId');
  var m = location.hash.match(/pt=([^&]+)/);
  var stored = null;
  try { stored = JSON.parse(sessionStorage.getItem('ws_project_auth') || 'null'); } catch (e) {}
  if (m && pid) stored = { projectId: pid, token: decodeURIComponent(m[1]) };
  if (stored && pid && stored.projectId !== pid) stored = null;
  if (stored && pid) { try { sessionStorage.setItem('ws_project_auth', JSON.stringify(stored)); } catch (e) {} }
  if (m) history.replaceState(null, '', location.pathname + location.search);
  window.__wsAuth = stored;

  // Never paint the screens' static demo markup: hold the page invisible
  // until the live snapshot has rendered, then reveal in one frame.
  document.documentElement.classList.add('ws-pending');
  var pendingStyle = document.createElement('style');
  pendingStyle.textContent = '.ws-pending body{visibility:hidden}';
  (document.head || document.documentElement).appendChild(pendingStyle);
  function showContent() { document.documentElement.classList.remove('ws-pending'); }

  var gate = document.createElement('div');
  gate.id = 'ws-auth-gate';
  gate.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#F7F7F5;display:none;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif';
  gate.innerHTML = '<div style="text-align:center;max-width:380px;padding:28px;background:#fff;border:1px solid #E4E4E7;border-radius:12px">'
    + '<strong style="font-size:15px">WorkSimplified Workspace</strong>'
    + '<p id="ws-auth-msg" style="color:#666;font-size:13px;line-height:1.6">Checking your access\\u2026</p></div>';

  // A stored session token means this is a tab switch, not a sign-in:
  // stay invisible while revalidating (denials reveal instantly). Only a
  // long hang with a token present falls back to the checker card.
  var gateTimer = stored ? setTimeout(function () { gate.style.visibility = 'visible'; gate.style.display = 'flex'; }, 6000) : null;
  function reveal() {
    if (gateTimer) clearTimeout(gateTimer);
    gate.style.visibility = 'visible';
    gate.style.display = 'flex';
  }

  function deny(msg) {
    reveal();
    var el = document.getElementById('ws-auth-msg');
    if (!el) return;
    var screenDir = location.pathname.split('/').filter(Boolean).slice(-2, -1)[0] || 'cockpit_living_project_workspace';
    var login = '../login/index.html?projectId=' + encodeURIComponent(pid || '')
      + '&next=' + encodeURIComponent(screenDir);
    el.innerHTML = msg + '<br><br><a href="' + login + '" style="color:#356AE6;font-weight:600">Sign in to the workspace</a>'
      + '<br><span style="font-size:11px">or open the <a href="http://127.0.0.1:3000/portal" style="color:#356AE6">portal</a></span>';
  }

  window.__authReady = (async function () {
    if (document.body) document.body.appendChild(gate);
    else document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(gate); });
    if (!pid || !stored) {
      deny('This workspace link is incomplete. Open it from Project Team or from your invite email.');
      return null;
    }
    try {
      var tok = stored.token;
      if (tok.indexOf('ws1.') !== 0) {
        var ex = await fetch('http://127.0.0.1:8020/api/projects/' + encodeURIComponent(pid) + '/screen-session', {
          method: 'POST', headers: { 'X-Project-Token': tok }
        });
        if (ex.ok) {
          var d = await ex.json();
          tok = d.screen_token;
          stored = { projectId: pid, token: tok };
          try { sessionStorage.setItem('ws_project_auth', JSON.stringify(stored)); } catch (e) {}
          window.__wsAuth = stored;
        } else if (ex.status === 401 || ex.status === 403) {
          deny('Your access link has expired or was revoked. Ask the project owner for a new invite.');
          return null;
        }
      }
      window.__wsTok = tok;
      var res = await fetch('http://127.0.0.1:8020/api/projects/' + encodeURIComponent(pid), {
        headers: { 'X-Project-Token': tok }
      });
      if (res.status === 401) {
        try { sessionStorage.removeItem('ws_project_auth'); } catch (e) {}
        deny('Your session has expired. Open the workspace again from Project Team.');
        return null;
      }
      if (res.status === 403) { deny('You no longer have access to this project.'); return null; }
      if (!res.ok) { deny('Could not verify access right now. Please try again.'); return null; }
      var snap = await res.json();
      window.__authSnap = snap;
      // Presence heartbeat: while any workspace screen is open and visible,
      // this member counts as live on the project (shown in Cockpit).
      var pingPresence = function () {
        fetch('http://127.0.0.1:8020/api/projects/' + encodeURIComponent(pid) + '/presence', {
          method: 'POST', headers: { 'X-Project-Token': tok }
        }).catch(function () {});
      };
      pingPresence();
      setInterval(function () { if (!document.hidden) pingPresence(); }, 45000);
      if (gateTimer) clearTimeout(gateTimer);
      gate.remove();
      requestAnimationFrame(function () { requestAnimationFrame(showContent); });
      return { snap: snap, member: snap.current_member || null, permissions: snap.permissions || {} };
    } catch (e) {
      deny('Could not reach the workspace service. Please try again.');
      return null;
    }
  })();
})();
