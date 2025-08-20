const BASE_URL = "https://api.frankfurter.dev/v1/latest?base";

const dropdowns = document.querySelectorAll('.dropdown select');
const button = document.querySelector('.btn');
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (const select of dropdowns) {
	for (const currenCode in countryList) {
		let newOption = document.createElement('option');
		newOption.innerText = currenCode;
		newOption.value = currenCode;
		if(select.name === 'from' && currenCode === 'USD'){
			newOption.selected = 'selected'
		}else if(select.name === 'to' && currenCode === 'INR'){
			newOption.selected = 'selected'
		}
		select.append(newOption);
	}
	select.addEventListener("change", (event) => {
		updateFlag(event.target);
	})
}

const updateFlag = (element) =>{
	let currenCode = element.value;
	let countryCode = countryList[currenCode];
	let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
	let img = element.parentElement.querySelectorAll("img");
	img[0].src=newSrc;
}


const updateExchangeRate = async() =>{
	let amount = document.querySelector(".amount input");
	let amtVal = amount.value;
	if(amtVal === "" || amtVal < 1){
		amtVal = 1
		amount.value = "1"
	}
	let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
	let response  = await fetch(URL);
	let data = await response.json();
	let rate  = data[toCurr.value.toLowerCase()];

	let finalAmount = amtVal * rate;
	msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

window.addEventListener('load', ()=>{
	updateExchangeRate()
})

button.addEventListener('click', (event)=>{
	event.preventDefault();
	updateExchangeRate();
})
