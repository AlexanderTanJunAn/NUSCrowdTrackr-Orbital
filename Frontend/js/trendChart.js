function renderTrendData() {
    CanvasJS.addColorSet("purpleShades", ["#9a40e3"]);
    var chart = new CanvasJS.Chart("chartTrendContainer", {
        animationEnabled: true,
        colorSet: "purpleShades",
        title: {
            text: "Past Trends"
        },
        data: [
            {   //dataSeries
                type: "column",
                name: "trend",
                dataPoints: [
                    { label: "7am", y: 0 }, //0
                    { label: "8am", y: 0 }, //1
                    { label: "9am", y: 0 }, //2
                    { label: "10am", y: 123 },  //3
                    { label: "11am", y: 123 },  //4
                    { label: "12pm", y: 123 },  //5
                    { label: "1pm", y: 123 },   //6
                    { label: "2pm", y: 123 },   //7
                    { label: "3pm", y: 123 },   //8
                    { label: "4pm", y: 123 },   //9
                    { label: "5pm", y: 123 },   //10
                    { label: "6pm", y: 123 },   //11
                    { label: "7pm", y: 123 },   //12
                    { label: "8pm", y: 123 },   //13
                    { label: "9pm", y: 123 },   //14   
                    { label: "10pm", y: 123 },  //15
                ]
            }
        ]
    });
    //chart.render();

    //Get a reference to the database service
    var database = firebase.database();

    database.ref('Exit').on('value', (snap) => {
        var totalRecord = snap.numChildren();
        chart.options.data[0].dataPoints[0].y = totalRecord;
        chart.options.data[0].dataPoints[1].y = totalRecord - Math.floor(Math.random() * 100);
        chart.options.data[0].dataPoints[2].y = totalRecord - (2 * Math.floor(Math.random() * 100));
        chart.render();     //render chart at the end for animations after updates
    });

    var timeSelect = parseInt(document.getElementById("time-selector-btm").value, 10);
    console.log(typeof timeSelect);

    if (!isNaN(timeSelect)) {
        if (timeSelect == 19) {
            var upper = 19 + 3;
            var lower = 19;
        } else {
            upper = timeSelect + 4;
            lower = timeSelect;
        }

        for (var i = 7; i < 23; i++) {
            if ((i > upper) || (i < lower)) {
                chart.options.data[0].dataPoints[i - 7].color = "#ddd3ee";
            }
        }
        chart.render();
    }
};