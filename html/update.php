<head>
   <title>Update</title>
</head>
<link href="/static/css/bootstrap.css" rel="stylesheet">
<script src="/static/js/bootstrap.js"></script>
<div class="container">
   <br>

   <?php
// if(isset($_COOKIE['admin'])) {

if($_GET["s"]==1){
echo "<div class='alert alert-success alert-dismissible fade show' role='alert' >
      Successfully Updated!
      <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
         <span aria-hidden='true'>&times;</span>
      </button>
   </div>";
}
echo shell_exec('git fetch');
echo nl2br("Difference(s): \n");
$shortdiff = shell_exec('git diff --numstat master origin/master');
echo nl2br($shortdiff);
if(empty($shortdiff)){
   echo "None";
}
echo nl2br("\n\n");
echo nl2br("Verbose: \n");
shell_exec('git diff master origin/master --color | /tmp/ansi2html.sh > gitDiff.html');
?>

   <iframe src="gitDiff.html" width="80%" height="50%"></iframe>



   <?php
function update()
{
   // `git clean -f -d`;
   `git pull`;
   `gulp nunjucks`;
   header('Location: /update.php?s=1');
}
function fupdate()
{
   // `git clean -f -d`;
   `git fetch origin master`;
   `git reset --hard FETCH_HEAD`;
   `gulp nunjucks`;
   header('Location: /update.php?s=1');
}
function cleanG(){
    `git clean -f -d`;
    `gulp nunjucks`;
    header('Location: /update.php');

}
if(array_key_exists('update',$_POST)){
   update();
}
if(array_key_exists('clean',$_POST)){
   cleanG();
}
if(array_key_exists('fupdate',$_POST)){
   fupdate();
}
if(array_key_exists('refresh',$_POST)){
   header('Location: /update.php');
}
if(array_key_exists('save',$_POST)){
   if($_POST['auto']){
      $_ENV['autopull'] = "true";
   }else{
      $_ENV['autopull'] = "";
   }
}
if ( $_POST['payload'] ) {
  if(!empty($_ENV['autopull'])){
   `git pull`;
   `gulp nunjucks`;
   }
 }
?>

   <br>
   <form method="post">
      <input type="submit" class="btn btn-primary" name="refresh" id="refresh" value="Refresh" />
      <input type="submit" class="btn btn-success" name="update" id="update" value="Update" />
      <input type="submit" class="btn btn-warning" name="fupdate" id="fupdate" value="Force Update" />
      <input type="submit" class="btn btn-warning" name="clean" id="clean" value="Clean" />
      <?php

      if(empty($_ENV['autopull'])){
         ?>
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
         <label class="btn btn-secondary">
            <input type="radio" name="auto" id="auto" autocomplete="off"> Auto
         </label>
         <label class="btn btn-secondary">
            <input type="radio" name="off" id="off" autocomplete="off" checked> Off
         </label>
      </div>
      <?php
      }else{
      ?>
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
         <label class="btn btn-secondary">
            <input type="radio" name="auto" id="auto" autocomplete="off" checked> Auto
         </label>
         <label class="btn btn-secondary">
            <input type="radio" name="off" id="off" autocomplete="off"> Off
         </label>
      </div>
      <?php
      }
      ?>
      <input type="submit" class="btn btn-primary" name="save" id="save" value="Save" />

   </form>
</div>


<?php
// }
?>