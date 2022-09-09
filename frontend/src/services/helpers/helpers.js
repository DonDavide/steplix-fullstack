import Helper from '../helpers/helpers'
var Helpers = {
    mapperToChart(rates){
        let dataToChart =[];  
        rates.forEach(function(rate) {
            let rateToChart = {
            date: Helper.formatDate(rate.created_at),
            value: rate.value 
            }
            dataToChart.push(rateToChart);
        });
        return dataToChart;
    },
    formatDate(dateDB){
		let dateShort = dateDB.substr(0,19);
		if(dateShort.includes("T")){
			let date = dateShort.split('T');
			let dateArray 	= date[0].split('-');
			return (dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0] + ' ' + date[1]);
		}else{
			return dateDB;
		}
	}
}
export default Helpers;