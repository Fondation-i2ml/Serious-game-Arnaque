class View {
    constructor() { }

    /**
     * Permet d'afficher une situation
     */
    displaySituation(situation) {
        const progress = (situation.id) * (100 / 12);
        console.log("progress is :" + progress)
        $("#mainBar").css({ width: progress + '%' });
        $("#enonce").html(situation.enonce);
        $("#situationIllu").attr("src", "img/situations/" + situation.id + ".png");
        $("input").prop("checked", false);
        for (const argumentId in situation.arguments) {
            $(".argumentList" + argumentId).empty();
            $('<p/>', {
                'class': 'argumentText text-gray-900',
                'text': situation.arguments[argumentId].enonce,
            }).appendTo('.argumentList' + argumentId);
        };
    }

    /**
     * Permet d'afficher l'écran de fin
     */
    displayEndGame() {
        $("#profilModal").show();
        $("#backButton").addClass("disabled");
        $("#backButton").html("Félicitation, vous avez terminé le jeu !");
    }

    /**
     * Permet d'afficher un argument entre 2 situations
     */
    displaySelectedArgument(argument, impact) {

        let energieValue;
        //display raw values
        if (impact.frustration <= 0) {
            energieValue = impact.energiePenality + 5;
            if (impact.frustration < 0) { //additional bonus if frustration is going down
                energieValue += 5;
            }
        }
        else { //no bonus if frustration is going up
            energieValue = impact.energiePenality;
        }
        $("#argEnonce").html(argument.enonce);
        $("#impactText").html(impact.text);
        $("#frustrationValue").html(impact.frustration);
        $("#energieValue").html(energieValue);
        $("#santeValue").html(impact.sante);
        $("#equilibreAlimValue").html(impact.equilibreAlim);

        //reset colors
        let classes = ["border-left-danger", "border-left-success", "border-left-info", "text-danger", "text-success", "text-info"];
        $("#frustrationCard").removeClass(classes);
        $("#energieCard").removeClass(classes);
        $("#santeCard").removeClass(classes);
        $("#equilibreAlimCard").removeClass(classes);
        $("#frustrationText").removeClass(classes);
        $("#energieText").removeClass(classes);
        $("#santeText").removeClass(classes);
        $("#equilibreAlimText").removeClass(classes);

        //display color
        if (impact.frustration > 0) {
            $("#frustrationCard").addClass("border-left-danger");
            $("#frustrationText").addClass("text-danger");
        };
        if (impact.frustration < 0) {
            $("#frustrationCard").addClass("border-left-success");
            $("#frustrationText").addClass("text-success");
        };
        if (impact.frustration == 0) {
            $("#frustrationCard").addClass("border-left-info");
            $("#frustrationText").addClass("text-info");
        };
        if (energieValue < 0) {
            $("#energieCard").addClass("border-left-danger");
            $("#energieText").addClass("text-danger");
        };
        if (energieValue > 0) {
            $("#energieCard").addClass("border-left-success");
            $("#energieText").addClass("text-success");
        };
        if (energieValue == 0) {
            $("#energieCard").addClass("border-left-info");
            $("#energieText").addClass("text-info");
        };
        if (impact.sante < 0) {
            $("#santeCard").addClass("border-left-danger");
            $("#santeText").addClass("text-danger");
        };
        if (impact.sante > 0) {
            $("#santeCard").addClass("border-left-success");
            $("#santeText").addClass("text-success");
        };
        if (impact.sante == 0) {
            $("#santeCard").addClass("border-left-info");
            $("#santeText").addClass("text-info");
        };
        if (impact.equilibreAlim < 0) {
            $("#equilibreAlimCard").addClass("border-left-danger");
            $("#equilibreAlimText").addClass("text-danger");
        };
        if (impact.equilibreAlim > 0) {
            $("#equilibreAlimCard").addClass("border-left-success");
            $("#equilibreAlimText").addClass("text-success");
        };
        if (impact.equilibreAlim == 0) {
            $("#equilibreAlimCard").addClass("border-left-info");
            $("#equilibreAlimText").addClass("text-info");
        };
    }

    /**
     * Display information about the player
     */
    updatePlayerInfo(player) {
        let classes = ["bg-success", "bg-warning", "bg-danger"];
        $("#frustrationBar").removeClass(classes);
        $("#energieBar").removeClass(classes);
        $("#santeBar").removeClass(classes);
        $("#equilibreAlimBar").removeClass(classes);
        if ($("#frustrationValue").text() < 0) {
            $("#frustrationSpan").html(`<i class="fas fa-chevron-down"></i> En diminution.`);
        };
        if ($("#frustrationValue").text() == 0) {
            $("#frustrationSpan").html(`<i class="fas fa-grip-lines"></i> Stable.`);
        };
        if ($("#frustrationValue").text() > 0) {
            $("#frustrationSpan").html(`<i class="fas fa-chevron-up"></i> En augmentation.`);
        };
        if ($("#energieValue").text() < 0) {
            $("#energieSpan").html(`<i class="fas fa-chevron-down"></i> En diminution.`);
        };
        if ($("#energieValue").text() == 0) {
            $("#energieSpan").html(`<i class="fas fa-grip-lines"></i> Stable.`);
        };
        if ($("#energieValue").text() > 0) {
            $("#energieSpan").html(`<i class="fas fa-chevron-up"></i> En augmentation.`);
        };
        if ($("#santeValue").text() < 0) {
            $("#santeSpan").html(`<i class="fas fa-chevron-down"></i> En diminution.`);
        };
        if ($("#santeValue").text() == 0) {
            $("#santeSpan").html(`<i class="fas fa-grip-lines"></i> Stable.`);
        };
        if ($("#santeValue").text() > 0) {
            $("#santeSpan").html(`<i class="fas fa-chevron-up"></i> En augmentation.`);
        };
        if ($("#equilibreAlimValue").text() < 0) {
            $("#equilibreAlimSpan").html(`<i class="fas fa-chevron-down"></i> En diminution.`);
        };
        if ($("#equilibreAlimValue").text() == 0) {
            $("#equilibreAlimSpan").html(`<i class="fas fa-grip-lines"></i> Stable.`);
        };
        if ($("#equilibreAlimValue").text() > 0) {
            $("#equilibreAlimSpan").html(`<i class="fas fa-chevron-up"></i> En augmentation.`);
        };

        let bad = 0;
        let good = 0;
        if (player.frustration < 40) {
            good++;
            $("#frustrationBar").addClass("bg-success").css({ width: player.frustration + '%' });
        };
        if (player.frustration >= 40 && player.frustration <= 60) {
            $("#frustrationBar").addClass("bg-warning").css({ width: player.frustration + '%' });
        };
        if (player.frustration > 60) {
            bad++;
            $("#frustrationBar").addClass("bg-danger").css({ width: player.frustration + '%' });
        };
        if (player.energie < 40) {
            bad++;
            $("#energieBar").addClass("bg-danger").css({ width: player.energie + '%' });
        };
        if (player.energie >= 40 && player.energie <= 60) {
            $("#energieBar").addClass("bg-warning").css({ width: player.energie + '%' });
        };
        if (player.energie > 60) {
            good++;
            $("#energieBar").addClass("bg-success").css({ width: player.energie + '%' });
        };
        if (player.sante < 40) {
            bad++;
            $("#santeBar").addClass("bg-danger").css({ width: player.sante + '%' });
        };
        if (player.sante >= 40 && player.sante <= 60) {
            $("#santeBar").addClass("bg-warning").css({ width: player.sante + '%' });
        };
        if (player.sante > 60) {
            good++;
            $("#santeBar").addClass("bg-success").css({ width: player.sante + '%' });
        };
        if (player.equilibreAlim < 40) {
            bad++;
            $("#equilibreAlimBar").addClass("bg-danger").css({ width: player.equilibreAlim + '%' });
        };
        if (player.equilibreAlim >= 40 && player.equilibreAlim <= 60) {
            $("#equilibreAlimBar").addClass("bg-warning").css({ width: player.equilibreAlim + '%' });
        };
        if (player.equilibreAlim > 60) {
            good++;
            $("#equilibreAlimBar").addClass("bg-success").css({ width: player.equilibreAlim + '%' });
        };

        if (bad > 0) {
            $("#profilIllu").attr("src", "img/faces/Triste.png");
        } else {
            if (good >= 2) {
                $("#profilIllu").attr("src", "img/faces/Heureux.png");
            } else {
                $("#profilIllu").attr("src", "img/faces/Normal.png");
            }
        }

    }
}