<?php 
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