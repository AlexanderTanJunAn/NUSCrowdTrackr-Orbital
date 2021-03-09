function renderAverageData() {
    CanvasJS.addColorSet("purpleShades", ["#9a40e3"]);
    var chart = new CanvasJS.Chart("chartAverageContainer", {
        animationEnabled: true,
        colorSet: "purpleShades",
        title: {
            text: "Weekly Average"
        },
        data: [
            {   //dataSeries
                type: "column",
                name: "weekly",
                dataPoints: [
                    { label: "M", y: 0 },
                    { label: "T", y: 0 },
                    { label: "W", y: 0 },
                    { label: "T", y: 123 },
                    { label: "F", y: 156 },
                    { label: "S", y: 100 },
                    { label: "S", y: 58 }
                ]
            }
        ]
    });
    //chart.render();

    //Get a reference to the database service
    var database = firebase.database();

    database.ref('Exit').on('value', (snap) => {
        var totalRecord = snap.numChildren();
        console.log("Total Record: " + totalRecord);
        chart.options.data[0].dataPoints[0].y = totalRecord;
        chart.options.data[0].dataPoints[1].y = totalRecord - Math.floor(Math.random() * 100);
        chart.options.data[0].dataPoints[2].y = totalRecord - (2 * Math.floor(Math.random() * 100));
        chart.render();     //render chart at the end for animations after updates

        var percentage = Math.round((totalRecord - Math.floor(Math.random() * 100)) / 350 * 100);
        document.getElementById("percentage").innerHTML = percentage;

        var color = perc2color(percentage);
        //console.log(color);
        //console.log(document.getElementById("percentage").innerHTML);
        document.getElementById("percentage").style.color = color;
    })
};