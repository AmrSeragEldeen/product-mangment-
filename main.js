
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
let mood_search = 'title';


// GET TOTAL

function get_total (){

    if( price.value != ''){
        let result =  ( +price.value + +taxes.value + +ads.value )- +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';

    }else {
        total.innerHTML ='';
        total.style.background = '#a00d02';
    }
}
//-----------------------------------------------------------------

//create data 

let dataH;
if(localStorage.product != null)
{
    dataH = JSON.parse(localStorage.product)
}else{dataH =[];}


submit.onclick = function(){
    let newpro = {

        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
        
    }
    // count functiion

    if (title.value != '' && category.value != '' && newpro.count < 100)
    {
        if (mood === 'create')
        {
            if (newpro.count > 1){
                for(let i = 0; i<newpro.count; i++ )
                {
                    dataH.push(newpro)
            }
            }
            else{
            dataH.push(newpro)
            }
    
        }else
        {
            dataH[tmp] = newpro;
            mood = 'create';
            submit.innerHTML ='Create';
            count.style.display='block';
        }
        
    }else{
        
    }

    
    localStorage.setItem('product', JSON.stringify(dataH))

    cleardata();
    read_data();
}
//-----------------------------------------------------------------
// clear input 

function cleardata(){

    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value   = '';
    total.innerHTML= '';
    count.value='';
    discount.value = '';
    category.value = '';

}
//-----------------------------------------------------------------
// read data 

function read_data(){
    get_total();
    let table ='';

    for (let i =0 ; i < dataH.length ;i++)
{
    table = table + ` 
    <tr>
    <td>${i+1}</td>
    <td>${dataH[i].title}</td>
    <td>${dataH[i].price}</td>
    <td>${dataH[i].taxes}</td>
    <td>${dataH[i].ads}</td>
    <td>${dataH[i].total}</td>
    <td>${dataH[i].discount}</td>
    <td>${dataH[i].category}</td>
    
    <td><button  onclick = "updatedata(${i}) "id="update">update</button></td>
    <td><button  onclick="  deletedata(${i})" id="delete">delete</button></td>
    </tr>`;
}

document.getElementById('tbody').innerHTML = table;
let delete_btn = document.getElementById('Delete_All');
if (dataH.length > 0){
    delete_btn.innerHTML = `<button onclick = "deleteall(${dataH.length})"> Delete All </button>`
}else{
    delete_btn.innerHTML='';

}
read_data()
}

//-----------------------------------------------------------------
//clear data function

function deletedata(i){
    dataH.splice(i,1)
    localStorage.product = JSON.stringify(dataH);
    read_data()

}

//-----------------------------------------------------------------

// delete data function() 

function deleteall()
{
    localStorage.clear();
    dataH.splice(0);
    read_data();
}

//udata data function

function updatedata(i){

    title.value = dataH[i].title;
price.value = dataH[i].price;
taxes.value = dataH[i].taxes;
ads.value = dataH[i].ads;
discount.value = dataH[i].ads;
category.value =dataH[i].category;
get_total ();
count.style.display = 'none';
submit.innerHTML = 'update';
mood = 'update';
tmp = i;
scroll({top:0,behavior: 'smooth',})
}

//search by title or category



function search_mood(id){
    let searchX = document.getElementById('search');
    if (id == 'searchtitle'){
        mood_search = 'Title';
        
    }else{
        mood_search = 'Category';
       
    }
    searchX.placeholder = 'Search By '+ mood_search ;
    searchX.focus();
    searchX.value = '';
    read_data();
}

// search by title function

function searchdata(value){
    let table ='';
    if (mood_search == 'title')
    { 
        for(let i = 0; i <dataH.length; i++)
    {
        if(dataH[i].title.includes(value)){
            table += ` 
            <tr>
            <td>${i}</td>
            <td>${dataH[i].title}</td>
            <td>${dataH[i].price}</td>
            <td>${dataH[i].taxes}</td>
            <td>${dataH[i].ads}</td>
            <td>${dataH[i].total}</td>
            <td>${dataH[i].discount}</td>
            <td>${dataH[i].category}</td>
            
            <td><button  onclick = "updatedata(${i}) "id="update">update</button></td>
            <td><button  onclick="  deletedata(${i})" id="delete">delete</button></td>
            </tr>`;
        

        } 
    
    }

    }else{
        for(let i = 0; i <dataH.length; i++)
        {
            if(dataH[i].category.includes(value)){
                table += ` 
                <tr>
                <td>${i}</td>
                <td>${dataH[i].title}</td>
                <td>${dataH[i].price}</td>
                <td>${dataH[i].taxes}</td>
                <td>${dataH[i].ads}</td>
                <td>${dataH[i].total}</td>
                <td>${dataH[i].discount}</td>
                <td>${dataH[i].category}</td>
                
                <td><button  onclick = "updatedata(${i}) "id="update">update</button></td>
                <td><button  onclick="  deletedata(${i})" id="delete">delete</button></td>
                </tr>`;
                
            
    
            } 
        
        }
    }
    document.getElementById('tbody').innerHTML = table;


}   
