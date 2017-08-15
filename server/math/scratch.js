const PCA = require('ml-pca');
const {Matrix} = require('ml-matrix');
//const dataset = require('ml-dataset-iris').getNumbers();
// dataset is a two-dimensional array where rows represent the samples and columns the features



let times = function(n, iterator) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(null,i);
    return accum;
};


let voteArray = times(200, (i)=>{
    return times(100, (i)=>{
        return Math.floor(Math.random() * (2 - (-1))) -1;
    })
});

let dataset = new Matrix(voteArray);
//console.log('dataset is ', dataset);
let startTime = new Date();

const pca = new PCA(dataset, {center:true, scale:true});

//console.log(pca.getExplainedVariance());
/*
[ 0.9246187232017269,
  0.05306648311706785,
  0.017102609807929704,
  0.005212183873275558 ]
*/


console.log(pca.predict(dataset)); // project new points into the PCA space
let runTime = new Date() - startTime;
console.log('PCA executed in ', runTime);

/*
[
  [ -2.830722471866897,
    0.01139060953209596,
    0.0030369648815961603,
    -0.2817812120420965 ],
  [ -2.308002707614927,
    -0.3175048770719249,
    0.059976053412802766,
    -0.688413413360567 ]]
*/
