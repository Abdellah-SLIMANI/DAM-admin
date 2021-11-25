export const mapEventkeyToTitle = {
    titre: 'Titre',
    s_cat: 'Genre',
    terminologia_anatomica : 'Terminologie (anatomica ou embryologica)',
    traduction_en: 'Traduction anglais',
    synthese: 'Synthèse et développement',
    auteurs: 'Auteurs',
    etymologie: 'Etymologie',
    synonyme: 'Synonyme',
    antonyme: 'Antonyme',
    homonyme: 'Homonyme',
    sigle: 'Sigle',
    symbole: 'Symbole',
    abreviation: 'Abréviation',
    references: 'Référence',
    voir: 'Renvoi vers les autres définitions séparées par des virgules',
    codes: 'Codes internes de spécialité',
    edition: 'Edition'
}

export const initContent = {
    titre : '',
    s_cat : '',
    terminologia_anatomica : '',
    traduction_en : '',
    etymologie : '',
    synonyme : '',
    antonyme : '',
    homonyme : '',
    sigle : '',
    symbole : '',
    abreviation : '',
    references : '',
    voir : '',
    edition : new Date().getFullYear().toString(),
}

export const config = {
    "uploader": {
        "insertImageAsBase64URI": true
      },
    readonly: false, 
    language: "fr",
    resizer: {
        "showSize": true,
        "hideSizeTimeout": 0,
        "min_width": 10,
        "min_height": 10
    },
    useSplitMode: true,
    autofocus: true,
    width: '100%',
    editHTMLDocumentMode: true
}

export const ReadOnly = {
    readonly: true,
    language: "fr",
    resizer: {
        "showSize": true,
        "hideSizeTimeout": 0,
        "min_width": 10,
        "min_height": 10
    },
    useSplitMode: true,
    autofocus: true,
    width: '100%',
}

export const isContainingObject = (object,array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === object) {
            return true;
        }
    }
    return false;
}

export const  AuthorInitContent = {
    nom : '',
    prenom : '',
    biographie : '',
    naissance: '',
    deces: ''
}

export const mapAuthorEventkeysToTitles = {
    nom: 'Nom',
    prenom: 'Prénom',
    biographie : 'Biographie',
    bibliographie: 'Bibliographie',
    naissance: 'Année de naissance',
    deces: 'Année de décès',
    lien: 'Liens vers les définitions',
}
export const MapTitlesToKeys = {
    traduction_en: {
        name:'traduction_en', 
        label: 'Anglais',
        type:'normal'
    },
    definition: {
        name:'definition',
        label: '',
        type:'definition'
    },
    abreviation: {
        name:'abreviation',
        label: 'Abreviation',
        type:'normal'
    },
    domaines: {
        name:'domaines',
        label: 'Domaines',
        type:'normal'
    },
    etymologie: {
        name:"etymologie", 
        label:'Etymologie',
        type:'normal'
    },
    terminologia_anatomica: {
        name:"terminologia_anatomica", 
        label:'Terminologia Anatomica',
        type:'normal'
    },
    synonyme: {
        name:'synonyme',
        label: 'Synonymes',
        type:'normal'
    },
    symbole: {
        name:'symbole',
        label: 'Symbole', 
        type:'normal'
    },
    antonyme: {
        name:'antonyme',
        label: 'Antonyme', 
        type:'normal'
    },
    homonyme: {
        name:'homonyme',
        label: 'Homonyme', 
        type:'normal'
    },
    references: {
        name:'references',
        label: 'Références ',
        type:'normal'
    },
    voir: {
        name:'voir',
        label: 'Cf.',
        type:'voir'
    },
    voir_aussi: {
        name:'voir_aussi',
        label: '',
        type:'voir'
    },
    edition: {
        name:'edition',
        label: 'Edition',
        type:'normal'
    },
}

export const titleProps = {
    titre: 'titre',
    s_cat: 's_cat',
    sigle: 'sigle',
    sigle_2 : 'sigle_2'
}
