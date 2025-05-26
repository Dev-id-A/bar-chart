//Size variables
        let w = null; 
        let h = null;
        let padding = null;
        let savedData = null;
        let svg = null;
        let tooltip = null;

const responsivityFn = () => {
    if(window.innerWidth < 375){
        w = 275 
        h = 170
        padding = 27.5
    }
    else if(window.innerWidth < 768){
        w = 350 
        h = 210
        padding = 35
    }
    else if(window.innerWidth < 1024){
        w = 750 
        h = 450
        padding = 75
    } else if(window.innerWidth > 1024){
        w = 1000; 
        h = 600;
        padding = 100;
    }
};

responsivityFn();

//Fetching data
        async function fetchData() {
            
            try {
                const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
                const data = await response.json();
                    return data.data;
            }
            catch(error){
                window.alert("There was an error trying to obtain data.");
            }
        }




const createSVG = (data) => {
//Create svg
        svg = d3.select("body")
                        .append("svg")
                        .style("width", w)
                        .style("height", h)
                        .attr("class", "border")
                        .style("background-color", "white");

//Title
            svg.append("text")
                .text("United States GDP")
                .attr("id", "title")
                .attr("x", w/2.8)
                .attr("y", padding)
                window.innerWidth < 768 ? d3.select("text").style("font-size", "20px"): "";

//GDP addition

            svg.append("text")
            .text("Gross Domestic Product")
            .attr("id", "GDP")
            .attr("x", w/4)
            .attr("y", -padding*2.7)
            .attr("transform", `rotate(-90,${w/2},${padding})`);

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

//Bars addition
                const rects = svg.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .attr("x", d => xScale(new Date(d[0])))
                    .attr("y", d => yScale(d[1]))
                    .attr("width", (w - 2 * padding) / data.length)
                    .attr("height",d => h - padding - yScale(d[1]))
                    .attr("fill", "cadetblue")


//Tooltip created

                        tooltip = d3.select("body")
                                    .append("div")
                                    .attr("id", "tooltip")
                                    .style("position", "absolute")
                                    .style("opacity", 0)
                                    .style("border", "3px solid black")
                                    .style("padding", "1%")
                                    .style("background-color", "rgba(67, 132, 168, 0.5)")
                                    


//Tooltip into rects
                    rects.attr("data-date", d => d[0])
                            .attr("data-gdp", d=> d[1])
                            .on("mouseover",(e, d)=>

                                tooltip.style("opacity", 1)
                                        .style("display", "block")
                                        .attr("data-date", d[0])
                                        .html(`Date: ${d[0]}<br> $${d[1]} Billion`)
                            )
                            .on("mousemove", e=>

                                tooltip.style("left", (e.pageX + 15) + "px")
                                        .style("top", (e.pageY - 80) + "px")
                            )
                            .on("mouseout", () =>

                                tooltip.style("opacity", 0)
                                        .style("display", "none")
                            )
        }

        fetchData().
            then(data => {
                savedData = data;
                createSVG(data);
            });

window.addEventListener("resize", () => {
    svg ? svg.remove():"" 
    tooltip.style("display", "none")
    responsivityFn();
    savedData ? createSVG(savedData):"";
})

