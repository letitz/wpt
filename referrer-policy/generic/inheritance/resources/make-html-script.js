function createScriptString(origin, referrer) {
  return `<script>
            fetch("${origin}/common/security-features/subresource/xhr.py",`
      + (referrer ? `{referrer: "${referrer}"}` : "")
      + `)
              .then(r => r.json())
              .then(j => {
                top.postMessage({referrer: j.headers.referer}, "*")
              }).catch(e => {
                top.postMessage({referrer: "FAILURE"}, "*");
              });
          <\/script>`;
}
