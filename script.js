//Size variables
        const w = 1000 
        const h = 500
        const padding = 50
        
//Fetching data
        async function fetchData() {
            
            try {
                const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
                const data = await response.json();
                     console.log(data.data[150][1]);
                    return data.data;
            }
            catch(error){
                window.alert("There was an error trying to obtain data.");
            }
        }


//Create svg
        const svg = d3.select("body")
                        .append("svg")
                        .style("width", w)
                        .style("height", h)
                        .attr("class", "border")
                        .style("background-color", "white");

//Title
//             svg.append("h1")
//             .text("hola")
//             .attr("id", "title")


        fetchData().
            then(data => {
                console.log(data);

//yScale related

                const yScale = d3.scaleLinear()
                                .domain([0, d3.max(data, d => d[1])])
                                .range([h - padding, padding])
        
                const yAxis = d3.axisLeft(yScale);

                svg.append("g")
                    .attr("id", "y-axis")
                    .attr("transform", `translate(${padding}, 0)`)
                    .call(yAxis);

//xScale related
                const xScale = d3.scaleTime()
                                .domain(d3.extent(data, d => new Date(d[0])))
                                .range([padding, w - padding])

                const xAxis = d3.axisBottom(xScale);

                 svg.append("g")
                    .attr("id", "x-axis")
                    .attr("transform", `translate(0, ${h - padding})`)
                    .call(xAxis);
                });