
<head>
<title>Update</title>
</head>
<link href="../static/resources/css/bootstrap.css" rel="stylesheet">
<script src="../static/resources/js/bootstrap.js"></script>
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
   `git pull`;

   header('Location: /update.php?s=1');

}
function fupdate()
{
   `git fetch origin master`;
   `git reset --hard FETCH_HEAD`;

   header('Location: /update.php?s=1');


}
if(array_key_exists('update',$_POST)){
   update();
}
if(array_key_exists('fupdate',$_POST)){
   fupdate();
}
if(array_key_exists('refresh',$_POST)){
   header('Location: /update.php');
}
?>

<br>
<form method="post">
   <input type="submit" class="btn btn-primary" name="refresh" id="refresh" value="Refresh"/>
   <input type="submit" class="btn btn-success" name="update" id="update" value="Update" />
   <input type="submit" class="btn btn-warning" name="fupdate" id="fupdate" value="Force Update" />
</form>
</div>


<?php
// }
?>