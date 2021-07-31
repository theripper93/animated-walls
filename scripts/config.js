Hooks.on("renderWallConfig", function(app,html) {

    const flags = app.object.data.flags["animated-walls"];

    const confightml = `
    <div class="form-group">
    <label>${game.i18n.localize("animated-walls.wallconfig.animtype.title")}</label>
    <select name="flags.animated-walls.animType">
        <option value="none" ${flags?.animType == "none" || !flags?.animType ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.animtype.opt0")}</option>
        <option value="move" ${flags?.animType == "move" ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.animtype.opt1")}</option>
        <option value="rotate" ${flags?.animType == "rotate" ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.animtype.opt2")}</option>
    </select>
</div>
    

<div class="form-group">
<label>${game.i18n.localize("animated-walls.wallconfig.anchor.title")}</label>
<select name="flags.animated-walls.anchor">
    <option value="c" ${flags?.anchor == "none" || !flags?.anchor ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.anchor.opt0")}</option>
    <option value="top" ${flags?.anchor == "top" ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.anchor.opt1")}</option>
    <option value="bottom" ${flags?.anchor == "bottom" ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.anchor.opt2")}</option>
    <option value="right" ${flags?.anchor == "right" ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.anchor.opt3")}</option>
    <option value="left" ${flags?.anchor == "left" ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.anchor.opt4")}</option>
</select>
</div>

<div class="form-group">
            <label>${game.i18n.localize("animated-walls.wallconfig.distance")}</label>
            <input type="text" name="flags.animated-walls.distance" value="${flags?.distance || 0}" data-dtype="Number">
        </div>

        <div class="form-group">
        <label>${game.i18n.localize("animated-walls.wallconfig.duration")}</label>
        <input type="text" name="flags.animated-walls.duration" value="${flags?.duration || 0}" data-dtype="Number">
    </div>

    <div class="form-group">
            <label>${game.i18n.localize("animated-walls.wallconfig.rotation")}</label>
            <input type="text" name="flags.animated-walls.rotation" value="${flags?.rotation || 0}" data-dtype="Number">
        </div>
`

    html.find(`select[name="ds"]`).closest(".form-group").after(confightml)

})