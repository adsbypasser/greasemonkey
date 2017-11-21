(async () => {

  const URL = 'http://127.0.0.1:8000/build/adsbypasser.full.es7.user.js';

  async function fetchScript (url) {
    let script = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
    });
    script = await script.text();
    return script;
  }

  function wait (msDelay) {
    return new Promise((resolve) => {
      setTimeout(resolve, msDelay);
    });
  }

  while (true) {
    try {
      let script = await fetchScript(URL);
      let id = await UserScriptRegistry.upsertFromSource(script);
      console.info('installed', id);
    } catch (e) {
      console.error('auto-install', e);
    }

    await wait(5 * 1000);
  }

})().catch(e => {
  console.error('auto-install', e);
});
