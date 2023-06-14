let paires = [];
let imgClique1; // premiere img cliqué
let imgClique2; // deuxieme img cliqué
let premierClic = true; // booléen signifiant que c'est la première d'une paire
let nbrPaire = 0;   // memorise le nombre de paires trouvées
let nbrEssai = 0; // nombre de paires retournées

$(document).ready(function () {

    $('#idRejouer').click(function(){
        jouer();
    });
    $('#idChoix').change(function(){
        jouer();
    });

    jouer();

});

function jouer() {

    premierClic = true;
    nbrPaire = 0;
    nbrEssai = 0;
    $('#idNbrPaire').val(nbrPaire);
    $('#idNbrEssai').val(nbrEssai);

    let choix = $('select').val();
    //let choix = document.querySelector('select').value;
    chargePaires(paires, choix);
    brasserPaires(paires);
    console.log(paires);

    let ul = '<ul>';
    for (const idx in paires) {
        ul += `<li><img src="${paires[idx]}"></li>`;
    }
    ul += '</ul>';
    console.log(ul);
    $('#container').html(ul);
    //document.querySelector('#container').innerHTML = ul;

    console.log($('img'));
    $('img').hide();

    $('li').click(function (ev) {

        console.log($(this).children('img'));
        if (!$(this).children('img').hasClass('retourne')) {
            $(this).children('img').show()
                .addClass('retourne');
            if (premierClic) {
                imgClique1 = $(this).children('img');
                console.log(imgClique1);
                premierClic = false;
            } else {
                imgClique2 = $(this).children('img');
                console.log(imgClique2);
                // teste si même image
                if (imgClique1.attr('src') === imgClique2.attr('src')) {
                    nbrPaire++;
                    $('#idNbrPaire').val(nbrPaire);
                } else {
                    setTimeout(function () {
                        imgClique1.hide().removeClass('retourne');
                        imgClique2.hide().removeClass('retourne');
                    }, 2000);

                }
                premierClic = true;
                nbrEssai++;
                $('#idNbrEssai').val(nbrEssai);
            }

        }
    });
}

function chargePaires(tab, paire) {

    for (let numImg = 1; numImg <= 8; numImg++) {
        let urlImg = `images/paires${paire}/${numImg}.jpg`;
        tab[numImg - 1] = urlImg;
        tab[numImg - 1 + 8] = urlImg;
    }
}

function brasserPaires(tab) {

    for (const i in tab) {
        let j = Math.floor(Math.random() * 16);
        let sauv = tab[i];
        tab[i] = tab[j];
        tab[j] = sauv;
    }
}