let serveImporterScript = false;

self.addEventListener('message', event => {
  serveImporterScript = true;
  event.source.postMessage("Done");
});

self.addEventListener('fetch', function(event) {
    if (serveImporterScript) {
      serveImporterScript = false;
      event.respondWith(
        new Response(
          'window.importHelper = (specifier) => import(specifier);',
          {headers: {"Content-Type": "text/javascript"}}
        ));
    } else {
      event.respondWith(
        new Response(
          'export const response = ' +
              JSON.stringify({url: event.request.url}) + ';',
          {headers: {"Access-Control-Allow-Origin": "*",
                     "Content-Type": "text/javascript"}}
        ));
    }
});
