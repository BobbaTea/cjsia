<?php
$myfile = fopen("boolean", "r") or die("Unable to open file!");
$c = fread($myfile,filesize("boolean"));
echo $c;
fclose($myfile);
if($_SERVER['REQUEST_METHOD'] === 'POST'){
   if($c === "true"){
      `git fetch origin master`;
      `git pull`;
      `gulp nunjucks`;
      echo "SUCCESS!";
   }else{
   echo "FAILED!";
   }
}

?>