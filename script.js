        async function fetchData() {
            
            try {
                const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
                const data = await response.json();
                     console.log(data.data[150][1]);
                    return data.data
            }
            catch(error){
                window.alert("There was an error trying to obtain data.")
            }
        }


        const svg = d3.select("main")
                        .append("svg")
                        .style("width", "100%")
                        .style("height", "86.5%")
                        .attr("class", "border")

        fetchData().
            then(data => {
                console.log(data)
            })