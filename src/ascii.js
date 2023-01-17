const fs = require('fs');
const version = "1.0.0"
const license = 'GPL-3.0'

const start = `
Meta Miner X
Version: ${version}
License: ${license}
`

const excavator = [
     [
      `                
            

    __      
   //\\\\\`'-.___
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
 _L    /\\\\~~//_  |\tMeta Miner X // Web-scraper
(/\\)  |_((_|___L_|\tVersion: ${version}
     (____(_______)\tLicense: ${license}
         `,
         `


    __        
   //\\\\\`'-.___
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
  :    /\\\\~~//_  |\tMeta Miner X // Web-scraper
 _L   |_((_|___L_|\tVersion: ${version}
(/\\) (____(_______)\tLicense: ${license}
         `,
         `
             
     
    __         
   //\\\\\`'-.___
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
  :    /\\\\~~//_  |\tMeta Miner X // Web-scraper
 _L   |_((_|___L_|\tVersion: ${version}
(||) (____(_______)\tLicense: ${license}
         `,
         `
              
     
    __        
   //\\\\\`'-.___
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
  :    /\\\\~~//_  |\tMeta Miner X // Web-scraper
 _L   |_((_|___L_|\tVersion: ${version}
(\\/) (____(_______)\tLicense: ${license}
         `
    ],
    [
     `                
               \t／￣￣￣￣￣￣￣￣￣
               \t|   {QUICKFACT1}
    __         \t|   {QUICKFACT2}
   //\\\\\`'-.___\t/へ.＿＿＿＿＿＿＿
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
 _L    /\\\\~~//_  |\tMeta Miner X // Web-scraper
(/\\)  |_((_|___L_|\tVersion: ${version}
     (____(_______)\tLicense: ${license}
    `,
   `
               \t／￣￣￣￣￣￣￣￣￣
               \t|   {QUICKFACT1}
    __         \t|   {QUICKFACT2}
   //\\\\\`'-.___\t/へ.＿＿＿＿＿＿＿
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
  :    /\\\\~~//_  |\tMeta Miner X // Web-scraper
 _L   |_((_|___L_|\tVersion: ${version}
(/\\) (____(_______)\tLicense: ${license}
   `,
    `
               \t／￣￣￣￣￣￣￣￣￣
               \t|   {QUICKFACT1}
    __         \t|   {QUICKFACT2}
   //\\\\\`'-.___\t/へ.＿＿＿＿＿＿＿
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
  :    /\\\\~~//_  |\tMeta Miner X // Web-scraper
 _L   |_((_|___L_|\tVersion: ${version}
(||) (____(_______)\tLicense: ${license}
    `,
    `
               \t／￣￣￣￣￣￣￣￣￣
               \t|   {QUICKFACT1}
    __         \t|   {QUICKFACT2}
   //\\\\\`'-.___\t/へ.＿＿＿＿＿＿＿
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
  :    /\\\\~~//_  |\tMeta Miner X // Web-scraper
 _L   |_((_|___L_|\tVersion: ${version}
(\\/) (____(_______)\tLicense: ${license}
    `
 ]
]

const spider = [
     [
          `
     |
  /  |   \\
 ;_/,L-,\\_;
\\._/3  E\\_./
\\_./(::)\._/
     ''
               \tMeta Miner X // Web-crawler
               \tVersion: ${version}
               \tLicense: ${license}
          `,
          `
     |
     |
  /  |   \\
 ;_/,L-,\\_;
\\._/3  E\\_./
\\_./(::)\._/
     ''        \tMeta Miner X // Web-crawler
               \tVersion: ${version}
               \tLicense: ${license}
          `,
          `
     |
     |
     |
  /  |   \\
 ;_/,L-,\\_;
\\._/3  E\\_./
\\_./(::)\._/  \tMeta Miner X // Web-crawler
     ''        \tVersion: ${version}
               \tLicense: ${license}
          `,
          `
     |
     |
     |
     |
  /  |   \\
 ;_/,L-,\\_;
\\._/3  E\\_./ \tMeta Miner X // Web-crawler
\\_./(::)\._/  \tVersion: ${version}
     ''        \tLicense: ${license}
          `
     ],
     [
           `
     |         \t／￣￣￣￣￣￣￣￣￣
  /  |   \\    \t|   {QUICKFACT1}
 ;_/,L-,\\_;   \t|   {QUICKFACT2}
\\._/3  E\\_./\t/へ.＿＿＿＿＿＿＿
\\_./(::)\._/
     ''
               \tMeta Miner X // Web-crawler
               \tVersion: ${version}
               \tLicense: ${license}
          `,
          `
     |         \t／￣￣￣￣￣￣￣￣￣
     |         \t|   {QUICKFACT1}
  /  |   \\    \t|   {QUICKFACT2}
 ;_/,L-,\\_;   \t/へ.＿＿＿＿＿＿＿
\\._/3  E\\_./
\\_./(::)\._/
     ''        \tMeta Miner X // Web-crawler
               \tVersion: ${version}
               \tLicense: ${license}
          `,
          `
     |         \t／￣￣￣￣￣￣￣￣￣
     |         \t|   {QUICKFACT1}
     |         \t|   {QUICKFACT2}
  /  |   \\    \t/へ.＿＿＿＿＿＿＿
 ;_/,L-,\\_;
\\._/3  E\\_./
\\_./(::)\._/  \tMeta Miner X // Web-crawler
     ''        \tVersion: ${version}
               \tLicense: ${license}
          `,
          `
     |         \t／￣￣￣￣￣￣￣￣￣
     |         \t|   {QUICKFACT1}
     |         \t|   {QUICKFACT2}
     |         \t/へ.＿＿＿＿＿＿＿
  /  |   \\
 ;_/,L-,\\_;
\\._/3  E\\_./ \tMeta Miner X // Web-crawler
\\_./(::)\._/  \tVersion: ${version}
     ''        \tLicense: ${license}
          `
     ]
]

module.exports = {excavator, spider, start}