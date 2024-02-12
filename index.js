let container = document.querySelector(".container")
let searchInput = document.querySelector("#search-input")
let searchBtn = document.querySelector("#search-btn")
let searchHistoryBtn = document.querySelector("#search-history-btn")


let API_KEY = "52b2051"

let history = []

function getSearchData(){
    let inputValue = searchInput.value

    // console.log("start")

    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${inputValue}`)
    .then(function (res){
        return res.json()
    })
    .then(function (res){
        // console.log(res)
        history.push(inputValue)
        showData(res.Search , "search")

    })
    
    container.innerHTML = `<h2>Loading .....</h2>`
}

function showData(data , flag){
  console.log(data)
  container.innerHTML = ""
  if(flag == "search"){
    data.forEach(function (ele){
        let div = document.createElement("div")
        let img = document.createElement("img")
        img.src = ele.Poster
 
        let title = document.createElement("p")
        title.innerHTML = `<b>Title : </b> ${ele.Title}`
        
        let year = document.createElement("p")
        year.innerHTML = ele.Year

        div.addEventListener("click" , function(){
            movieDetail(ele.imdbID)
        })
      
        div.append(img , title , year)
        container.append(div)
 
   })
  }else if(flag === "history"){
      let ol = document.createElement("ol")
       data.forEach(function (ele){
        let li = document.createElement("li")
        li.innerText = ele

        ol.append(li)
     })

     container.append(ol)
  }
}

function movieDetail(id){
    console.log(id)
    localStorage.setItem("movieId" , id)
    window.location.href = "movieDetail.html"
}


searchBtn.addEventListener("click" , function(){
    getSearchData()
})
searchHistoryBtn.addEventListener("click" , function (){
     showData(history , "history")
})



