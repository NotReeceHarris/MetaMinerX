const fs = require('fs');
const version = "1.0.0"
const license = 'GPL-3.0'

const excavatorSpeech = [
    `                
               \t／￣￣￣￣￣￣￣￣￣
               \t|   {QUICKFACT1}
    __         \t|   {QUICKFACT2}
   //\\\\\`'-.___\t/へ.＿＿＿＿＿＿＿
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
 _L    /\\\\~~//_  |\tMeta Miner X
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
  :    /\\\\~~//_  |\tMeta Miner X
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
  :    /\\\\~~//_  |\tMeta Miner X
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
  :    /\\\\~~//_  |\tMeta Miner X
 _L   |_((_|___L_|\tVersion: ${version}
(\\/) (____(_______)\tLicense: ${license}
   `
]


const excavator = [
      `                
            

    __      
   //\\\\\`'-.___
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
 _L    /\\\\~~//_  |\tMeta Miner X
(/\\)  |_((_|___L_|\tVersion: ${version}
     (____(_______)\tLicense: ${license}
     `,
     `


    __        
   //\\\\\`'-.___
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
  :    /\\\\~~//_  |\tMeta Miner X
 _L   |_((_|___L_|\tVersion: ${version}
(/\\) (____(_______)\tLicense: ${license}
     `,
     `
             
     
    __         
   //\\\\\`'-.___
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
  :    /\\\\~~//_  |\tMeta Miner X
 _L   |_((_|___L_|\tVersion: ${version}
(||) (____(_______)\tLicense: ${license}
     `,
     `
              
     
    __        
   //\\\\\`'-.___
  //  \\\\  _(=()__
  Y    \\\\//~//.--|
  :    /\\\\~~//_  |\tMeta Miner X
 _L   |_((_|___L_|\tVersion: ${version}
(\\/) (____(_______)\tLicense: ${license}
     `
]

module.exports = {excavator, excavatorSpeech}