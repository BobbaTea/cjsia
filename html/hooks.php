<?php
$myfile = fopen("boolean", "r") or die("Unable to open file!");
$c = fread($myfile,filesize("boolean"));
echo $c;
fclose($myfile);
if($_SERVER['REQUEST_METHOD'] === 'POST'){
   if($c === "true"){
      `git fetch origin master`;
      `git pull`;
      `gulp render`;
      echo "SUCCESS!";
   }else{
   echo "FAILED!";
   }
}

?>

<!-- {
            "name": "WWP South",
            "reps": [
                {
                    "name": "Example",
                    "position": "Representative",
                    "path": "../static/images/board/akash.png"
                },
                {
                    "name": "Example 2",
                    "position": "Publicist",
                    "path": "../static/images/board/rishi.png"
                }
            ]
        },
        {
            "name": "WWP North",
            "reps": [
                {
                    "name": "Example 3",
                    "position": "Representative",
                    "path": "../static/images/board/samvit.png"
                },
                {
                    "name": "Example 4",
                    "position": "Publicist",
                    "path": "../static/images/board/carol.png"
                }
            ]
        } -->