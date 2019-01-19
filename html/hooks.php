<?php 
if(!session_id()) session_start();

if($_SERVER['REQUEST_METHOD'] === 'POST'){
   if($_SESSION['autopull'] === "true"){
      `git fetch origin master`;
      `git pull`;
      `gulp nunjucks`;
      echo "SUCCESS!";
   }
   echo "FAILED!";
}
?>