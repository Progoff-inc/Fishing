<?php
require 'models.php';
class DataBase {
    //$this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_portal;charset=UTF8','nomokoiw_portal','KESRdV2f');
    public $db;
    public function __construct()
    {
        //$this->db = new PDO('mysql:host=localhost;dbname=myblog;charset=UTF8','nlc','12345');
        //$this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_poff;charset=UTF8','nomokoiw_poff','ms87%L39');
        //$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }

    public function uploadFile($pid, $files, $t){
        $img=$this->getImage($pid, $t);
        if($img){
            $this->removeFile($img);
        }
        $url = "http://client.nomokoiw.beget.tech/progoff/";
        $n = basename($t."_".$pid."_".$files['Data']['name']);
        $tid=ucfirst($t)."Id";
        $t .="s";
        $d = "Files/$n";
        if(file_exists("Files")){
            
            if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                $s = $this->db->prepare("UPDATE $t SET Image=? WHERE $tid=?");
                $s->execute(array($url.$d, $pid));
                return($url.$d);
            }else{
                return($_FILES['Data']['tmp_name']);
            }
        }else{
            mkdir("Files");
            if(move_uploaded_file($files['Data']['tmp_name'], $d)){
                $s = $this->db->prepare("UPDATE $t SET Image=? WHERE $tid=?");
                $s->execute(array($url.$d, $pid));
                return($url.$d);
            }else{
                return($_FILES['Data']['tmp_name']);
            }
        }
        
        return false;
    }

    private function genInsertQuery($ins, $t){
        $res = array('INSERT INTO '.$t.' (',array());
        $q = '';
        for ($i = 0; $i < count(array_keys($ins)); $i++) {
            $res[0] = $res[0].array_keys($ins)[$i].',';
            $res[1][]=$ins[array_keys($ins)[$i]];
            $q=$q.'?,';
            
        }
        $res[0]=rtrim($res[0],',');
        $res[0]=$res[0].') VALUES ('.rtrim($q,',').');';
        
        return $res;
        
    }
    private function genUpdateQuery($keys, $values, $t, $id){
        $res = array('UPDATE '.$t.' SET ',array());
        $q = '';
        for ($i = 0; $i < count($keys); $i++) {
            if($values[$i]!='now()'){
                $res[0] = $res[0].$keys[$i].'=?, ';
                $res[1][]=$values[$i];
            }
            else{
                $res[0] = $res[0].$keys[$i].'=now(), ';
            }
            
            
        }
        $res[0]=rtrim($res[0],', ');
        $res[0]=$res[0].' WHERE '.rtrim($t,'s').'Id = '.$id;
        
        return $res;
        
    }
    
    private function removeFile($filelink){
        $path = explode('vi/',$filelink);
        unlink($path[1]);
        
    }
    
    public function getBanks(){
        // $sth = $this->db->query("SELECT * FROM banks");
        // $sth->setFetchMode(PDO::FETCH_CLASS, 'Bank');
        // return $sth->fetchAll();
        return array();
    }

    public function getBoats(){
        // $sth = $this->db->query("SELECT * FROM boats");
        // $sth->setFetchMode(PDO::FETCH_CLASS, 'Boat');
        // return $sth->fetchAll();
        return array();
    }

    public function getBoatsFishings($t, $ds, $df){
        return array();
        // $sth = $this->db->query("SELECT * FROM sales");
        // $sth->setFetchMode(PDO::FETCH_CLASS, 'Sale');
        // $sales = [];
        // while ($s = $sth->fetch()) {
        //     $s->Services = $this->getSaleServs($s->Id);
        //     $sales[] = $s;
        // }
        // return $sales;
    }

    public function getFishings($ds, $df){
        return array();
    }
    
    public function getMaxCatchBoats($ds, $df){
        return array();
    }

    public function getBankBoatsAboveAvg($bid){
        return array();
    }

    public function getFish($ds, $df){
        return array();
    }

    public function getBankFishFishings($bid, $df){
        return array();
    }

    public function addBoat($boat){
        return 1;
    }

    public function addFishing($fishing){
        return 1;
    }

    public function addFishingBank($bank){
        return 1;
    }

    public function addBank($bank){
        return 1;
    }

    public function updateBoat($boat){
        return 1;
    }

    public function addApp($app, $attachment){
        $res = $this->genInsertQuery($app,"apps");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        if($attachment['Id']!='null'){
            $attachment['AppId'] = $this->db->lastInsertId();
            $res = $this->genInsertQuery($attachment,"attachments");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }
        
        
        return $this->db->lastInsertId();
    }


    
}
?>