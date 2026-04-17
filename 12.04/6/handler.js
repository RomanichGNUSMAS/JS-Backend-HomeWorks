module.exports.parser = function (content) {
    const result = content.split(/\r?\n/);
    const config = {};
    const requiredFields = ['PORT', 'DB_HOST', 'DB_USER']

    result.forEach(line => {
        const id = line.trim();
        if (!id || id.startsWith('#')) return;

        const [key, ...value] = id.split('=');
        const val = value.join('=');

        if (key) config[key.trim()] = val.trim()
    });
    let flag = false;
    for (const required of requiredFields) {
        try {
            if (!config[required]) { flag = true; throw new Error(`You forgot the required field ${required}`); }
        } catch (e) { console.error(e.message) }
    }
    if(flag) return {};
    return config
}