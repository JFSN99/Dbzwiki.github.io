

function toggleCMenu(SMenu) {
    SMenu.classList.toggle("SubM");
    SMenu.classList.toggle("SubMS");  
}

function rotateArrow(Seta){
    Seta.classList.toggle("seta");
    Seta.classList.toggle("setaUp");
}


async function fetchChar(e, page){
    let IReq= e.target.getAttribute("data-log");
    page = e.target.classList.contains("item")?funcs.page=1:page;
    funcs.page = page
    if(IReq === 'planets'){
        document.querySelectorAll('.Botao').forEach((item) => item.setAttribute("data-log","planets"));
    }else{
        document.querySelectorAll('.Botao').forEach((item) => item.setAttribute("data-log","characters"))
    }
    const req = await fetch(`https://dragonball-api.com/api/${IReq}?page=${page}&limit=10`);
    const Json = await req.json();
    console.log(Json)
    Options(Json, IReq);
    tit(IReq);
    menuFilter(IReq);
}

async function fetchFilter(IReq, setF){
    
    const req = await fetch(`https://dragonball-api.com/api/${IReq}${setF}`);
    const Json = await req.json();
    Options(Json, IReq);
    tit(IReq);
    menuFilter(IReq);
    
}

function menuFilter(Ireq){

    const FilterM = document.querySelector(".FM");
    FilterM.innerHTML=""
    const ItemPlanets = ["Não Destruído", "Destruído"];
    const ItemChars = [
        {
            categoria: 'Raça',
            opcoes:['Human','Saiyan','Namekian','Majin' ,'FriezaRace','Android','Jiren Race','God Angel' ,'Evil' ,'Nucleico' ,'Nucleico benigno' ,'Unknown']
        },
        {
            categoria: 'Afiliação',
            opcoes:['Z Fighter' ,'Red Ribbon Army' ,'Namekian Warrior' ,'Freelancer' ,'Army of Frieza', 'Pride Troopers' ,'Assistant of Vermoud','God Assistant of Beerus', 'Villain','Other']
        },
        {
            categoria:'Gênero',
            opcoes:['Male', 'Female', 'Unknown']
        } 
        
    ];

    if(Ireq === "planets"){

        ItemPlanets.forEach((item) => {

            const NewI = document.createElement("li");
            NewI.innerHTML=`${item}`;
            NewI.addEventListener("click", () => funcs.isFiltering = true);
            FilterM.appendChild(NewI);
            if(item === "Não Destruído"){

                NewI.addEventListener("click", () => fetchFilter(Ireq, "?isDestroyed=false"));

            }else if(item === "Destruído"){

                NewI.addEventListener("click", () => fetchFilter(Ireq, "?isDestroyed=true"));

            }
            
        })

    }else if(Ireq === "characters"){
        
        ItemChars.forEach((item) => {
        
            const NewI = document.createElement("div");
            NewI.classList.add("catFil");
            NewI.innerHTML=`${item.categoria}`;
            const Img = document.createElement("img");
            Img.setAttribute("src","https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/angle-circle-up-icon.png");
            Img.classList.add('catFilIdown');
            NewI.appendChild(Img);
            NewI.addEventListener("click", () => funcs.isFiltering = true)
            FilterM.appendChild(NewI);

            if(item.categoria === 'Raça'){

                Img.classList.add(`arr`);
                NewI.addEventListener("click", () => {
                            
                    if(document.querySelector(`.arr`).classList.contains("catFilIup")){

                        document.querySelector(`.arr`).classList.replace("catFilIup","catFilIdown");

                    }else if(document.querySelector(`.arr`).classList.contains("catFilIdown")){

                        document.querySelector(`.arr`).classList.replace("catFilIdown","catFilIup");

                    }
                    
                })

                item.opcoes.forEach((item) => {
                    
                    const NewIFilho = document.createElement("li");
                    NewIFilho.innerHTML=`${item}`;
                    NewIFilho.classList.add('optFilterA');
                    NewIFilho.addEventListener("click", () => {

                        fetchFilter(Ireq, `?race=${item}`);

                    })
                    FilterM.appendChild(NewIFilho);
                    NewI.addEventListener("click", () => {
                        
                        NewIFilho.classList.toggle('optFilterA');
                        NewIFilho.classList.toggle('optFilterSA');
                        
                     
                    }
                        
                )
                    

                })
            }else if(item.categoria === 'Afiliação'){
                Img.classList.add(`arr2`);
                NewI.addEventListener("click", () => {
                            
                    if(document.querySelector(`.arr2`).classList.contains("catFilIup")){

                        document.querySelector(`.arr2`).classList.replace("catFilIup","catFilIdown");

                    }else if(document.querySelector(`.arr2`).classList.contains("catFilIdown")){

                        document.querySelector(`.arr2`).classList.replace("catFilIdown","catFilIup");

                    }
                    
                })
                item.opcoes.forEach((item) => {

                    const NewIFilho = document.createElement("li");
                    NewIFilho.innerHTML=`${item}`;
                    NewIFilho.classList.add('optFilterB');
                    NewIFilho.addEventListener("click", () => {

                        fetchFilter(Ireq, `?affiliation=${item}`);

                    })
                    FilterM.appendChild(NewIFilho);
                    
                    NewI.addEventListener("click", () => {

                        NewIFilho.classList.toggle('optFilterB');
                        NewIFilho.classList.toggle('optFilterSB');

                    })

                })
            }else if(item.categoria === 'Gênero'){
                Img.classList.add(`arr3`);
                NewI.addEventListener("click", () => {
                            
                    if(document.querySelector(`.arr3`).classList.contains("catFilIup")){
                        document.querySelector(`.arr3`).classList.replace("catFilIup","catFilIdown");    
                    }else if(document.querySelector(`.arr3`).classList.contains("catFilIdown")){
                        document.querySelector(`.arr3`).classList.replace("catFilIdown","catFilIup");
                    }
                    
                })
                item.opcoes.forEach((item) => {

                    const NewIFilho = document.createElement("li");
                    NewIFilho.innerHTML=`${item}`;
                    NewIFilho.classList.add('optFilterC');
                    NewIFilho.addEventListener("click", () => {

                        fetchFilter(Ireq, `?gender=${item}`);

                    })
                    FilterM.appendChild(NewIFilho);
                    NewI.addEventListener("click", () => {

                        NewIFilho.classList.toggle('optFilterC');
                        NewIFilho.classList.toggle('optFilterSC');

                    })

                })
            }
            
            NewI.addEventListener("click", () => NewI)
            
        })

    }

}

function tit(Ireq){
    
    const headtit = document.querySelector(".headtitle");
    if(Ireq === null){
        return;
    }else{
        if(Ireq === "planets"){
            headtit.innerHTML = "Planetas";
        }else if(Ireq === "characters"){
            headtit.innerHTML = "Personagens";
        }
    }
}

async function fetchOnly(e, IReq){
    const InfoBody = document.querySelector(".infoBody");
    InfoBody.innerHTML = "";

    const AreaTr = document.createElement("div");
    

    const imgBox = document.createElement("div");
    imgBox.classList.add('infoimgBox');
    const desc = document.createElement("ul"); 
    desc.classList.add("listInfo");

    const infoS = document.querySelector(".infosS");
    
    
    const id = e.target.getAttribute("data-log");
    const req = await fetch(`https://dragonball-api.com/api/${IReq}/${id}`);
    const Json = await req.json();
    const Name = document.createElement("li");
    const img = document.createElement("img");
    const infoBase = document.createElement("div");
    infoBase.classList.add('AreaTr')

    if(IReq === 'characters'){

        
        infoBase.appendChild(desc);
        infoBase.appendChild(imgBox);
        const Ki = document.createElement("li");
        const Raça = document.createElement("li");
        const Afiliacao = document.createElement("li");
        img.setAttribute("src", `${Json.image}`);
        Name.innerHTML = `<div>Nome:</div> <div>${Json.name}</div>`;
        Ki.innerHTML = `<div>Ki:</div> <div>${Json.ki}</div>`;
        Raça.innerHTML = `<div>Raça:</div> <div>${Json.race}</div>`;
        Afiliacao.innerHTML = `<div>Afiliação:</div> <div>${Json.affiliation}</div>`;
        img.classList.add("infoImg");
        imgBox.appendChild(img);
        infoBase.appendChild(imgBox);
        desc.appendChild(Name);
        desc.appendChild(Ki);
        desc.appendChild(Raça);
        desc.appendChild(Afiliacao);
        infoBase.appendChild(desc)
        Name.classList.add('infoItem');
        Ki.classList.add('infoItem');
        Raça.classList.add('infoItem');
        Afiliacao.classList.add('infoItem');
        InfoBody.appendChild(infoBase);
        
       

        if(Json.transformations.length > 0){
            const title = document.createElement("h2");
            title.innerHTML = 'Transformações';
            title.classList.add('Transftit')
            AreaTr.appendChild(title)
            const SliderCont = document.createElement("div");
            SliderCont.classList.add('SliderCont');
            const Slider = document.createElement("div");
            Slider.classList.add('Slider');

            Json.transformations.forEach((item) => {

                Slider.style.width = `calc(${Json.transformations.length} * 200px)`
                const transformationsArea = document.createElement("div");
                transformationsArea.classList.add("transfBox");
                const itemTransf = document.createElement("div");
                const img = document.createElement("img");
                img.classList.add("transImg")
                const name = document.createElement("h3");
                name.style.textAlign = 'center';
                const ki = document.createElement("h3");
                ki.style.textAlign = 'center';
                img.setAttribute('src',`${item.image}`) ;
                name.innerHTML = `${item.name}`;
                ki.innerHTML = `${item.ki}`;
                AreaTr.classList.add("infosTransf");
                itemTransf.appendChild(img);
                itemTransf.appendChild(name);
                itemTransf.appendChild(ki);
                transformationsArea.appendChild(itemTransf);
                Slider.appendChild(transformationsArea);
                SliderCont.appendChild(Slider)

            })

            
            AreaTr.appendChild(SliderCont)
            InfoBody.appendChild(AreaTr)
            
        }


    }else if(IReq === 'planets'){

        img.setAttribute("src", `${Json.image}`);
        Name.innerHTML = `<div>Nome:</div> <div>${Json.name}</div>`;
        img.classList.add("infoImg");
        infoBase.appendChild(imgBox);
        desc.appendChild(Name);
        infoBase.appendChild(desc);
        Name.classList.add('infoItem');
        imgBox.appendChild(img);
        InfoBody.appendChild(infoBase)

    }
    
}


function Options(Json, IReq){

    const Lista = document.querySelector(".Lista");
    Lista.innerHTML = "";
    const headtitle = "";
    let cont = 10*(funcs.page-1) + 1;
    console.log(Json);
    if(funcs.isFiltering === false){
        Json.items.forEach((item) => {

            console.log(item)
            const NewOp = document.createElement("div");
            const Box = document.createElement("div");
            Box.classList.add("Box");
            const title = document.createElement("div");
            title.classList.add("Pers")
            const Img = document.createElement("img");
            if(IReq === "planets"){
                Img.setAttribute("style","border:1px solid black")
            }
            Img.setAttribute("src",`${item.image}`);
            Img.classList.add("optImg");
            title.innerHTML=`${item.name}`;
            Box.appendChild(title)
            Box.appendChild(Img);
            NewOp.appendChild(Box);
            Box.setAttribute("data-log", item.id);
            Img.setAttribute("data-log", item.id);
            NewOp.addEventListener("click",(e) => {
                fetchOnly(e, IReq);
                ShowInfo()
            })
            cont+=1;
            Lista.appendChild(NewOp);
            
        })
    }else if(funcs.isFiltering === true){
        Json.forEach((item) => {

            const NewOp = document.createElement("div");
            const Box = document.createElement("div");
            Box.classList.add("Box");
            const title = document.createElement("div");
            title.classList.add("Pers")
            const Img = document.createElement("img");
            if(IReq === "planets"){

                Img.setAttribute("style","border:1px solid black");

            }
            Img.setAttribute("src",`${item.image}`);
            Img.classList.add("optImg");
            title.innerHTML=`${item.name}`;
            Box.appendChild(title)
            Box.appendChild(Img);
            NewOp.appendChild(Box);
            Box.setAttribute("data-log", item.id);
            Img.setAttribute("data-log", item.id);
            NewOp.addEventListener("click",(e) => {
                fetchOnly(e,IReq);
                ShowInfo();
            })
            cont+=1;
            Lista.appendChild(NewOp);
            
        })
    }
    
}

function ShowInfo(){
    const Info = document.querySelector(".infos");
    if(Info !== null){
     
        Info.classList.replace("infos", "infosS");
    
    }
}

function closeInfo(){
    const Info = document.querySelector(".infosS");
    Info.classList.replace("infosS", "infos");
}


function PassPage(e){

    if(funcs.isFiltering === true){
        return
    }else{

        if(e.target.getAttribute("data-log") === 'planets'){
            if(funcs.page === 2){
                alert("Não há mais planetas");
            }else{
                funcs.page += 1
                console.log(funcs.page)
                fetchChar(e,funcs.page);
            }
        }else if(e.target.getAttribute("data-log") === 'characters'){
            if(funcs.page === 6){
                alert("Não há mais personagens")
            }else{
                funcs.page += 1
                console.log(funcs.page)
                fetchChar(e,funcs.page);
            }
        }else{
            return
        }
    }
    
}

function PrevPage(e){
    console.log(e.target)

    if(funcs.isFiltering === true){
        return
    }else{

        if(e === null){
            return
        }else{
            if(funcs.page === 1){
            return;
            }else{
                funcs.page -= 1
                console.log(funcs.page)
                fetchChar(e,funcs.page);
            }
        }
    }
}

function show(){
   
    if(document.querySelector(".content") !== null){
        document.querySelector(".content").classList.replace("content",".contentS")
    }
    
}

function showMFilter(){
    const FilterM = document.querySelector(".FM");
    if(FilterM.classList.contains("FilterMenu")){
        FilterM.classList.replace("FilterMenu", "FilterMenuS")
    }else if(FilterM.classList.contains("FilterMenuS")){
        FilterM.classList.replace("FilterMenuS", "FilterMenu")
    }
    
}

async function fetchSearch(e){
    
    let Palavra = '';
    let search = document.querySelector(".search");
    let lupa = document.querySelector(".lupa")
    search
    if((e.key === 'Enter' || e.target.classList.contains('lupa')) && search.value !== ""){
        
        Palavra = search.value.trim().toLowerCase();
        let PalavraSplit = Palavra.split("");
        search.value = "";
        PalavraSplit[0] = PalavraSplit[0].toUpperCase()
        PalavraSplit = PalavraSplit.join("")
        const Pages = [1,2,3,4,5,6];
        let Achou = false;
        

        for(let i of Pages){
        
            const req = await fetch(`https://dragonball-api.com/api/characters?page=${i}&limits=10`);
            const Json = await req.json();
            Json.items.map((item) => {
                if(item.name === PalavraSplit){
                    search.setAttribute("data-log", item.id);
                    lupa.setAttribute("data-log", item.id);
                    console.log(lupa.getAttribute('data-log'))
                    Achou = true;
                    fetchOnly(e, 'characters');
                    ShowInfo();
                }
            })
        }
        
        if(Achou === false){
            alert('Personagem não encontrado...')
        }
        
    }

  


}

const funcs = {
    page:1,
    isFiltering:false,
    start:()=>{
        const close = document.querySelector(".Clinfo");
        const item = document.querySelectorAll(".item")
        const MenuT = document.querySelector('.MenuTrigger');
        const SMenu = document.querySelector('.SubM');
        const Seta = document.querySelector('.seta');
        const Next = document.querySelector('.Next');
        const Prev = document.querySelector('.Prev');
        const Filter = document.querySelector(".bbox");
        const search = document.querySelector(".search");
        const lupa = document.querySelector(".lupa")

        MenuT.addEventListener("click",() => {
            toggleCMenu(SMenu);
            rotateArrow(Seta);
        });
       console.log(funcs.page) 
       item.forEach((item) => item.addEventListener("click",(e) => {
            
            show();
            fetchChar(e,this.page);

        }));
       
       close.addEventListener("click", () => closeInfo());
       Next.addEventListener("click",PassPage)
       Prev.addEventListener("click",PrevPage)
       Filter.addEventListener("click", showMFilter)
       Filter.addEventListener("click",() => funcs.isFiltering = false)
       search.addEventListener("keydown", fetchSearch);
       lupa.addEventListener("click", fetchSearch)
    }
}

funcs.start();