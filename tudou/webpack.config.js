var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractLESS = new ExtractTextPlugin('app.css');

module.exports = {  
  entry: "./src/js/index.js",  
  output: {  
    path: "./dist",  
    filename:"app01.js"  
  },
  module:{
  	  loaders: [  
  	        { 
  	        	test: /\.less$/, 
  	         	loader:ExtractTextPlugin.extract('style', 'css!less')
  	        },
  	        { 
  	        	test: /\.(png|jpg|gif)$/, 
  	        	loader: "url-loader?name=images/[name].[ext]&mimetype=image/png&limit=512" 
  	        }
      		/*,{
      			test : /\.(less|css)$/,
   				loader: ExtractTextPlugin.extract('style', 'css!less')
   			}*/
      ] 
  },
  plugins:[
     extractLESS
  ]
  
} 