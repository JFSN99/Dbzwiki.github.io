import { Json, JsonItemOnly, JsonLinks, JsonMeta, JsonTransf, IReq } from "./types";

function toggleCMenu(SMenu:HTMLElement) {
    SMenu.classList.toggle("SubM");
    SMenu.classList.toggle("SubMS");  
}

function rotateArrow(Seta:HTMLElement){
    Seta.classList.toggle("seta");
    Seta.classList.toggle("setaUp");
}



async function fetchChar(e:Event, page:number){

    let A = e.target as HTMLElement;
    let IReq = '';
    let Pop = A.getAttribute("data-log");
    if(Pop !== null){

        IReq = Pop;         
        page = A.classList.contains("item")?funcs.page=1:page;
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

}
    

async function fetchFilter(IReq:string, setF:string){
    
    const req = await fetch(`https://dragonball-api.com/api/${IReq}${setF}`);
    const Json = await req.json();
    Options(Json, IReq);
    tit(IReq);
    menuFilter(IReq);
    
}

function menuFilter(Ireq:string){

    const FilterM = document.querySelector(".FM") as HTMLElement;
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
                    const arr = document.querySelector(`.arr`) as HTMLElement;
                            
                    if(arr.classList.contains("catFilIup")){

                        arr.classList.replace("catFilIup","catFilIdown");

                    }else if(arr.classList.contains("catFilIdown")){

                        arr.classList.replace("catFilIdown","catFilIup");

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
                const arr2 = document.querySelector(`.arr2`) as HTMLElement; 
                NewI.addEventListener("click", () => {
                            
                    if(arr2.classList.contains("catFilIup")){

                        arr2.classList.replace("catFilIup","catFilIdown");

                    }else if(arr2.classList.contains("catFilIdown")){

                        arr2.classList.replace("catFilIdown","catFilIup");

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
                const arr3 = document.querySelector(`.arr3`) as HTMLElement
                NewI.addEventListener("click", () => {
                            
                    if(arr3.classList.contains("catFilIup")){
                        arr3.classList.replace("catFilIup","catFilIdown");    
                    }else if(arr3.classList.contains("catFilIdown")){
                        arr3.classList.replace("catFilIdown","catFilIup");
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

function tit(Ireq:string){
    
    const headtit = document.querySelector(".headtitle") as HTMLElement;
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

async function fetchOnly(e:Event, IReq:string){
    const InfoBody = document.querySelector(".infoBody") as HTMLElement;
    InfoBody.innerHTML = "";

    const AreaTr = document.createElement("div");
    

    const imgBox = document.createElement("div");
    imgBox.classList.add('infoimgBox');
    const desc = document.createElement("ul"); 
    desc.classList.add("listInfo");

    const infoS = document.querySelector(".infosS");
    
    const B = e.target as HTMLInputElement
    const id = B.getAttribute("data-log");
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

            Json.transformations.forEach((item:JsonTransf) => {

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


function Options(Json:Json, IReq:string){

    const Lista = document.querySelector(".opts") as HTMLElement;
    Lista.innerHTML = "";
    const headtitle = "";
    let cont = 10*(funcs.page-1) + 1;
    
    if(funcs.isFiltering === false){

        Json.items.forEach((item:JsonItemOnly) => {

            console.log()
            const NewOp = document.createElement("div");
            const Box = document.createElement("div");
            Box.classList.add("Box");
            const title = document.createElement("div");
            title.classList.add("Pers")
            const Img = document.createElement("img");
            if(IReq === "planets"){
                Lista.classList.add('Lista');
                if(Lista.classList.contains('ListaP')){
                    Lista.classList.remove('ListaP');
                }
                Img.setAttribute("style","border:1px solid black")
            }else{
                Lista.classList.add('ListaP');
                if(Lista.classList.contains('Lista')){
                    Lista.classList.remove('Lista');
                }
            }
            Img.setAttribute("src",`${item.image}`);
            Img.classList.add("optImg");
            title.innerHTML=`${item.name}`;
            Box.appendChild(title)
            Box.appendChild(Img);
            NewOp.appendChild(Box);
            Box.setAttribute("data-log", item.id.toString());
            Img.setAttribute("data-log", item.id.toString());
            NewOp.addEventListener("click",(e) => {
                fetchOnly(e, IReq);
                ShowInfo()
            })
            cont+=1;
            Lista.appendChild(NewOp);
            
        })
    }else if(funcs.isFiltering === true){
        Json.items.forEach((item) => {

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
            Box.setAttribute("data-log", item.id.toString());
            Img.setAttribute("data-log", item.id.toString());
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

    const Info = document.querySelector(".infos") as HTMLElement;
    if(Info !== null){
     
        Info.classList.replace("infos", "infosS");
    
    }

}

function closeInfo(){
    const Info = document.querySelector(".infosS") as HTMLInputElement;
    Info.classList.replace("infosS", "infos");
}


function PassPage(e:MouseEvent){

    if(funcs.isFiltering === true){
        return
    }else{

        const Chill = e.target as HTMLElement

        if(Chill.getAttribute("data-log") === 'planets'){
            if(funcs.page === 2){
                alert("Não há mais planetas");
            }else{
                funcs.page += 1
                console.log(funcs.page)
                fetchChar(e,funcs.page);
            }
        }else if(Chill.getAttribute("data-log") === 'characters'){
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

function PrevPage(e:MouseEvent){
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
   const content = document.querySelector(".content") as HTMLElement;
    if(content !== null){
        content.classList.replace("content",".contentS")
    }
    
}

function showMFilter(){

    const FilterM = document.querySelector(".FM") as HTMLElement;
    if(FilterM.classList.contains("FilterMenu")){
        FilterM.classList.replace("FilterMenu", "FilterMenuS")
    }else if(FilterM.classList.contains("FilterMenuS")){
        FilterM.classList.replace("FilterMenuS", "FilterMenu")
    }
    
}

async function fetchSearch(e:KeyboardEvent){
    
    let Palavra = '';
    let search = document.querySelector(".search") as HTMLInputElement;
    let lupa = document.querySelector(".lupa") as HTMLElement;
    const Cool = e.target as HTMLElement
    
    if((e.key === 'Enter' && Cool.classList.contains('lupa') === false) || (Cool.classList.contains('lupa') && e.key === null) && search.value !== ""){
        
        Palavra = search.value.trim().toLowerCase();
        let PalavraSplit:string[] = Palavra.split("");
        search.value = "";
        PalavraSplit[0] = PalavraSplit[0].toUpperCase()
        const Palavrajoined = PalavraSplit.join("")
        const Pages = [1,2,3,4,5,6];
        let Achou = false;
        

        for(let i of Pages){
        
            const req = await fetch(`https://dragonball-api.com/api/characters?page=${i}&limits=10`);
            const Json = await req.json();
            Json.items.map((item:JsonItemOnly) => {
                if(item.name === Palavrajoined){
                    search.setAttribute("data-log", item.id.toString());
                    lupa.setAttribute("data-log", item.id.toString());
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

async function  fetchLupa(e:Event){
    
    let lupa = document.querySelector('.lupa') as HTMLElement
    let search = document.querySelector(".search") as HTMLInputElement;
    if(search.value !== "" && search.value !== null){
        let  Palavra = search.value.trim().toLowerCase();
        let PalavraSplit:string[] = Palavra.split("");
        search.value = "";
        PalavraSplit[0] = PalavraSplit[0].toUpperCase()
        const Palavrajoined = PalavraSplit.join("")
        const Pages = [1,2,3,4,5,6];
        let Achou = false;
        
        for(let i of Pages){
        
            const req = await fetch(`https://dragonball-api.com/api/characters?page=${i}&limits=10`);
            const Json = await req.json();
            Json.items.map((item:JsonItemOnly) => {
                if(item.name === Palavrajoined){
                    search.setAttribute("data-log", item.id.toString());
                    lupa.setAttribute("data-log", item.id.toString());
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
    start:() => {
        const close = document.querySelector(".Clinfo") as HTMLElement;
        const item = document.querySelectorAll(".item");
        const MenuT = document.querySelector('.MenuTrigger') as HTMLElement;
        const SMenu = document.querySelector('.SubM') as HTMLElement;
        const Seta = document.querySelector('.seta') as HTMLElement;
        const Next = document.querySelector('.Next') as HTMLElement;
        const Prev = document.querySelector('.Prev') as HTMLElement;
        const Filter = document.querySelector(".bbox") as HTMLElement;
        const search = document.querySelector(".search") as HTMLInputElement;
        const lupa = document.querySelector(".lupa") as HTMLElement;

        MenuT.addEventListener("click",() => {
            toggleCMenu(SMenu);
            rotateArrow(Seta);
        });
       console.log(funcs.page) 
       item.forEach((item) => item.addEventListener("click",(e) => {
            
            show();
            fetchChar(e, funcs.page);

        }));
       
       close.addEventListener("click", () => closeInfo());
       Next.addEventListener("click",PassPage)
       Prev.addEventListener("click",PrevPage)
       Filter.addEventListener("click", showMFilter)
       Filter.addEventListener("click",() => funcs.isFiltering = false)
       search.addEventListener("keydown", fetchSearch);
       lupa.addEventListener("click", fetchLupa)
       
    }
}

funcs.start();