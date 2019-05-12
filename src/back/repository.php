<?php
require 'models.php';
class DataBase {
    //$this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_portal;charset=UTF8','nomokoiw_portal','KESRdV2f');
    public $db;
    public function __construct()
    {
        //$this->db = new PDO('mysql:host=localhost;dbname=myblog;charset=UTF8','nlc','12345');
        $this->db = new PDO('mysql:host=localhost;dbname=nomokoiw_fish;charset=UTF8','nomokoiw_fish','KESRdV2f');
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
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
        $sth = $this->db->query("SELECT * FROM banks");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Bank');
        return $sth->fetchAll();
        
    }

    public function getBoats(){
        $sth = $this->db->query("SELECT * FROM boats");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Boat');
        return $sth->fetchAll();
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
        
       
        $sth = $this->db->prepare("SELECT FishingId, BoatId, DateStart, DateFinish, (select SUM(Weight) FROM fishingbankfish WHERE FishingId=f.FishingId) as Catch from fishings f WHERE DateStart>=? and DateFinish<=?");
        
         $sth->execute(array($ds, $df));
        
         
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Fishing');
        $fishings = [];
        while ($f = $sth->fetch()) {
            $f->Sailors = $this->getFishingSailors($f->FishingId);
            $f->Banks = $this->getFishingBanks($f->FishingId);
            $f->Boat = $this->getBoat($f->BoatId);
            $fishings[] = $f;
        }
        return $fishings;
    }
    
    public function getSailors(){
        $sth = $this->db->query("SELECT * FROM sailors");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Sailor');
        return $sth->fetchAll();
    }
    
    private function getFishingSailors($fid){
        $sth = $this->db->prepare("SELECT * FROM sailors WHERE SailorId in (SELECT SailorId FROM Fishings");
        $sth->execute(array($fid));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Sailor');
        return $sth->fetchAll();
    }
    
    private function getFishingBanks($fid){
        $sth = $this->db->prepare("SELECT fb.BankId as BankId, b.Name as Name, fb.Quality as Quality FROM fishingbanks fb join banks b on fb.BankId = b.BankId WHERE fb.FishingId=?");
        $sth->execute(array($fid));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'FishingBank');
        $banks = [];
        while ($b = $sth->fetch()) {
            //$b->Catches = $this->getBankCatches($fid,$b->BankId);
            $banks[] = $b;
        }
        return $banks;
    }
    
    private function getBoat($bid){
        $sth = $this->db->prepare("SELECT * FROM boats WHERE BoatId=?");
        $sth->execute(array($bid));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Boat');
        return $sth->fetch();
    }
    
    private function getBankCatches($fid, $bid){
        $sth = $this->db->prepare("SELECT FishType, Weight from fishingbankfish where FishingId=? and BankId=?");
        $sth->execute(array($fid, $bid));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'FishCatch');
        return $sth->fetchAll();
        
    }
    
    public function getMaxCatchBoats($ds, $df){
        return array();
    }

    public function getBanksAvgCatch($ds, $df){
        $sth = $this->db->prepare("SELECT FishingId, BoatId, DateStart, DateFinish, (select SUM(Weight) FROM fishingbankfish WHERE FishingId=f.FishingId) as Catch from fishings f WHERE DateStart>=? and DateFinish<=?");
        
         $sth->execute(array($ds, $df));
        
         
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Fishing');
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
        $res = $this->genInsertQuery($boat,"boats");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }
    
    public function addSailor($sailor){
        $res = $this->genInsertQuery($sailor,"sailors");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
    }

    public function addFishing($fishing){
        $sailors = $fishing['Sailors'];
        unset($fishing['Sailors']);
        
        $res = $this->genInsertQuery($fishing,"fishings");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        $id = $this->db->lastInsertId();
        for($i = 0; $i<count($sailors); $i++){
            $sailors[$i]['FishingId']=$id;
            $res = $this->genInsertQuery($sailors[$i],"sailors");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }
        return $id;
    }

    public function addFishingBank($bank){
        $catches = $bank['Catches'];
        unset($bank['Catches']);
        $res = $this->genInsertQuery($bank,"fishingbanks");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        for($i = 0; $i<count($catches); $i++){
            $catches[$i]['FishingId']=$bank['FishingId'];
            $catches[$i]['BankId']=$bank['BankId'];
            $res = $this->genInsertQuery($catches[$i],"fishingbankfish");
            $s = $this->db->prepare($res[0]);
            if($res[1][0]!=null){
                $s->execute($res[1]);
            }
        }
        return $this->db->lastInsertId();
    }

    public function addBank($bank){
        $res = $this->genInsertQuery($bank,"banks");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        return $this->db->lastInsertId();
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