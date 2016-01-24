<?php
$f = new form();
$flag = $f->validate($_GET['name']);
echo var_dump($flag);

class form
{
    function validate($name)
    {
        if (!isset($name) && !empty($name)) {
            return true;
        }
        return false;
    }
}



