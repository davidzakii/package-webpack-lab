const pathM = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: 'production', // هنا بنحدد المود اللي هنشتغل بيه
  entry: "./src/index.js",// بنحدد ال انتري بوينت بتاعة البروجكت
  output: {
    filename: "bundle.js",
    path: pathM.resolve(__dirname, 'build'),
    assetModuleFilename: 'images/[name][ext]'// عشان ياخد نفس الاسم بتاع الصورة هعمل فولدر اسمه ايمجس ويبقى جواها كل الصور بنفس اسمها الاصلي و بعدين الاكستنشن

  },
  module: {
    rules: [
      {// css laoding
        test: /\.css$/i, // بالنسبة لل ملفات سي اس اس
        use: [//ايه اللودر اللي هنستخدمه
          'style-loader',//هتعمل تاج جوه الهيد وتحط في فايل ال سي اس اس
          'css-loader'//هتاخد فايل سي اس اس وتحوله لموديول يقدر يفهمه ويبباك ويحطه في الدبندانس
        ],
      },
      {//img loading
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource', // 
      },
      {// sass loading
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,// عشان يعمل ملف سي اس اس منفصل
          // "style-loader",
          "css-loader",
          "sass-loader"// هيحول الساس ل سي اس اس
        ],
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin(// بتاخد فايل اتش تي ام ال وتحط فيه الباندل جي اس
      // { template: './src/index.html' },//التمبلت 
      { inject: 'body' }),// تاج الاسكربت هتبقى في 
    new MiniCssExtractPlugin({ filename: "style.min.css" }),// اسم فايل السي اس اس
    new CssMinimizerPlugin()// هتعمل ميني فاي لملف السي اس اس
  ],

  optimization: {
    minimizer: [
      "...",//عشان يزود على البلوجنز
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["mozjpeg", { quality: 70 }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      // customize plugin options
                      convertShapeToPath: {
                        convertArcs: true
                      },
                      // disable plugins
                      convertPathData: false
                    }
                  }
                }
              ],
            ],
          },
        },
      }),
    ],
  }
}