
<head>
   <title>Update</title>
</head>
<link href="/static/css/bootstrap.css" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k"
    crossorigin="anonymous"></script>
<div class="container">
   <br>

   <?php
$myfile = fopen("boolean", "r") or die("Unable to open file!");
$c = fread($myfile,filesize("boolean"));

fclose($myfile);
if($_POST['payload'] ){
   if($c === "true"){
      `git fetch origin master`;
      `git pull`;
      `gulp nunjucks`;
      echo "SUCCESS!";
   }else{
   echo "FAILED!";
   }
}
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
   `git fetch origin master`;
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
if(array_key_exists('auto',$_POST)){
   $myfile = fopen("boolean", "w") or die("Unable to open file!");
   $txt = "true";
   fwrite($myfile, $txt);   
   fclose($myfile);
   header('Location: /update.php');
}
if(array_key_exists('off',$_POST)){
   $myfile = fopen("boolean", "w") or die("Unable to open file!");
   $txt = "false";
   fwrite($myfile, $txt);   
   fclose($myfile);
   header('Location: /update.php');
}
?>
   <br>
   <form method="post">
      <input type="submit" class="btn btn-primary" name="refresh" id="refresh" value="Refresh" />
      <input type="submit" class="btn btn-success" name="update" id="update" value="Update" />
      <input type="submit" class="btn btn-warning" name="fupdate" id="fupdate" value="Force Update" />
      <input type="submit" class="btn btn-warning" name="clean" id="clean" value="Clean" />
   <br>
   <br>

   State: <?php $myfile = fopen("boolean", "r") or die("Unable to open file!");
echo fread($myfile,filesize("boolean"));
fclose($myfile); ?>
   <input type="submit" class="btn btn-primary" name="auto" id="auto" value="Auto" />
   <input type="submit" class="btn btn-primary" name="off" id="off" value="Off" />

   </form>
</div>


<?php
// }
?>

