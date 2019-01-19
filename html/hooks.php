<?php 
session_start();
echo apc_fetch("autopull");
if($_SERVER['REQUEST_METHOD'] === 'POST'){
   if(apc_fetch("autopull") === "true"){
      `git fetch origin master`;
      `git pull`;
      `gulp nunjucks`;
      echo "SUCCESS!";
   }
   echo "FAILED!";
}
?>

