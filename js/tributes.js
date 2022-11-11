"use strict";
const setupTributes = () => {
    d.tributeMilestones.innerHTML = ``;
    n_tributes.tributes.forEach(({ unlockAt, description, title }, i) => {
        d.tributeMilestones.innerHTML += `<div id="m${i}t" title="${title}">
    <span id="m${i}c" class="w10">${unlockAt}</span><span id="m${i}"></span>
    <span id="m${i}d">${description}</span> <span id="m${i}e" class="lighttext"></span></div>`;
    });
    n_tributes.tributes.forEach((_, i) => {
        d[`m${i}t`] = $(`m${i}t`);
        d[`m${i}c`] = $(`m${i}c`);
        d[`m${i}d`] = $(`m${i}d`);
        d[`m${i}e`] = $(`m${i}e`);
        d[`m${i}`] = $(`m${i}`);
    });
};
