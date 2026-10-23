/* WorkSimplified workspace authentication for the Stitch screens.
   Entry: ?projectId=<id> with the project token in the #pt= fragment.
   The raw token is exchanged once for a short-lived screen token (ws1.*);
   only the screen token is kept (tab session). Every screen must pass this
   gate: no valid project membership -> access screen, no demo content. */
/* Channel badge (frontend demo of multi-channel messaging): each member
   message shows the platform it arrived from in a small circle below it.
   Assignment is a stable hash of the message text, so a message keeps its
   channel across re-renders. When real channel metadata exists, callers
   pass x.channel and it wins. */
window.__wsChanBadge = function (content, channel) {
  var CHANNELS = [
    { id: 'worksimplified', label: 'WorkSimplified', bg: '#18181B', svg: '<text x="10" y="14" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" font-weight="700" fill="#fff">W</text>' },
    { id: 'whatsapp', label: 'WhatsApp', bg: '#25D366', svg: '<path fill="#fff" d="M10 2a7.9 7.9 0 0 0-6.8 12.2L2 18l3.9-1.1A8 8 0 1 0 10 2zm3.6 11.1c-.2.5-1.1 1-1.6 1-.4.1-1 .2-3.2-.7-2.7-1.1-4.4-3.8-4.5-4-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.6-.3h.5c.1 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1.1 2.2 1.4 2.5 1.6.3.1.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2 .9c.3.2.5.3.6.4 0 .1 0 .6-.2 1.1z"/>' },
    { id: 'telegram', label: 'Telegram', bg: '#229ED9', svg: '<path fill="#fff" d="M17.9 3.1L2.7 9.2c-.7.3-.6 1.2.1 1.4l3.7 1.2 1.4 4.3c.2.6.9.8 1.4.4l2.2-1.7 4.1 3c.6.4 1.4.1 1.6-.6l2.3-12.5c.1-.8-.6-1.4-1.3-1.1zM7.5 11.3l8.6-5.4c.2-.1.3.1.2.2l-7.2 6.6-.3 3-1.3-4.4z"/>' },
    { id: 'slack', label: 'Slack', bg: '#4A154B', svg: '<path fill="#fff" d="M7.2 3.5L6 8.1H8.3L9.5 3.5H7.2zm5.6 12.9l1.2-4.6H11.7l-1.2 4.6h2.3zM3.6 7L8.2 5.8 7.7 3.7 3.1 4.9 3.6 7zm12.7 5.9l-4.6 1.2.5 2.1 4.6-1.2-.5-2.1zM3 12.8l4.6-1.2L7.1 9.5 2.5 10.7 3 12.8zM17 7.1L12.4 8.3 12.9 10.4 17.5 9.2 17 7.1z"/>' }
  ];
  var pick = null;
  if (channel) pick = CHANNELS.filter(function (c) { return c.id === channel; })[0];
  if (!pick) {
    var h = 0, s = String(content || '');
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    pick = CHANNELS[h % CHANNELS.length];
  }
  return '<span title="Received via ' + pick.label + '" aria-label="Received via ' + pick.label + '" '
    + 'style="display:inline-flex;width:20px;height:20px;border-radius:50%;background:' + pick.bg + ';align-items:center;justify-content:center;box-shadow:0 1px 2px rgba(0,0,0,.18)">'
    + '<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">' + pick.svg + '</svg></span>';
};

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
