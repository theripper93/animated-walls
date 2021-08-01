Hooks.on("renderWallConfig", function(app,html) {

    const flags = app.object.data.flags["animated-walls"];

    const confightml = `
    <p class="notes">${game.i18n.localize("animated-walls.wallconfig.animation.hint")}</p>
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
    <option value="p1" ${flags?.anchor == "p1" ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.anchor.opt5")}</option>
    <option value="p2" ${flags?.anchor == "p2" ? 'selected=""' : ""}>${game.i18n.localize("animated-walls.wallconfig.anchor.opt6")}</option>
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

    <div class="form-group">
        <label>${game.i18n.localize("animated-walls.wallconfig.reverse")}</label>
        <div class="form-fields">
            <input type="checkbox" ${flags?.reverse ? 'checked=""' : ""} name="flags.animated-walls.reverse">
        </div>
      </div>

      <div class="form-group">
      <label>${game.i18n.localize("animated-walls.wallconfig.macro")}</label>
      <input type="text" name="flags.animated-walls.macro" value="${flags?.macro || ""}">
  </div>
`

    html.find(`select[name="ds"]`).closest(".form-group").after(confightml)

    //get all the jquery elements

    let $animtype = html.find('select[name="flags.animated-walls.animType"]')
    let $anchor = html.find('select[name="flags.animated-walls.anchor"]').closest(".form-group")
    let $distance = html.find('input[name="flags.animated-walls.distance"]').closest(".form-group")
    let $duration = html.find('input[name="flags.animated-walls.duration"]').closest(".form-group")
    let $rotation = html.find('input[name="flags.animated-walls.rotation"]').closest(".form-group")
    let $reverse = html.find('input[name="flags.animated-walls.reverse"]').closest(".form-group")

    $animtype.on("change", function() {
        const animType = $(this).val();
        switch (animType) {
            case "none":
                $anchor.hide();
                $distance.hide();
                $duration.hide();
                $rotation.hide();
                $reverse.hide();
                break;
            case "move":
                $anchor.hide();
                $distance.show();
                $duration.show();
                $rotation.hide();
                $reverse.show();
                break;
            case "rotate":
                $anchor.show();
                $distance.hide();
                $duration.show();
                $rotation.show();
                $reverse.show();

        }
        html.css({height: "auto"});
        })

    $animtype.trigger("change");

})