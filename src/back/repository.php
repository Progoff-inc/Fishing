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
    
    public function checkUser($e){
        $s = $this->db->prepare("SELECT * FROM users WHERE Email=?");
        $s->execute(array($e));
        return count($s->fetchAll())==0;
    }
    
    public function getUser($e, $p){
        $s = $this->db->prepare("SELECT Id, Name, Email, IsAdmin FROM users WHERE Email=? and Password=?");
        $s->execute(array($e, md5(md5($p))));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        return $s->fetch();
    }
    
    public function addUser($user){
        if($this->checkUser($user['Email'])){
            $user['Password'] = md5(md5($user['Password']));
            $res = $this->genInsertQuery($user,"users");
            $s = $this->db->prepare("INSERT INTO users (Name,Email,Password) VALUES (?,?,?);");
            $s->execute($res[1]);
            
            
            return $this->getUserById($this->db->lastInsertId());
        }else{
            return null;
        }
        
    }
    
    private function getUserById($id){
        $s = $this->db->prepare("SELECT Id, Name, Email, Password, IsAdmin FROM users WHERE Id=?");
        $s->execute(array($id));
        $s->setFetchMode(PDO::FETCH_CLASS, 'User');
        
        
        return $s->fetch();
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
        $sth = $this->db->prepare("SELECT DISTINCT b.BoatId, b.Name, b.Type from fishings f JOIN boats b ON f.BoatId = b.BoatId WHERE b.Type=? and f.DateStart>=? and f.DateFinish<=?");
        
        $sth->execute(array($t, $ds, $df));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Boat');
        $boats = [];
        while ($f = $sth->fetch()) {
            $f->Fishings = $this->getFishings($ds, $df, $f->BoatId);
            $boats[] = $f;
        }
        return $boats;
    }
    
    public function getFreeBoats($ds, $df){
        $sth = $this->db->prepare("SELECT b.BoatId, b.Name from boats b WHERE b.BoatId NOT IN (select DISTINCT b.BoatId from fishings f JOIN boats b ON f.BoatId = b.BoatId WHERE f.DateStart<=? and f.DateFinish>=?)");
        
        $sth->execute(array($ds, $df));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Boat');
        return $sth->fetchAll();
    }
    
    public function getFreeSailors($ds, $df){
        $sth = $this->db->prepare("SELECT b.SailorId, b.Surname, b.Name, b.Address from sailors b WHERE b.SailorId NOT IN (select DISTINCT s.SailorId from fishings f RIGHT JOIN fishingsailor fs ON fs.FishingId = f.FishingId JOIN sailors s ON fs.SailorId=s.SailorId WHERE f.DateStart<=? and f.DateFinish>=?)");
        
        $sth->execute(array($ds, $df));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Sailor');
        return $sth->fetchAll();
    }

    public function getFishings($ds, $df, $bid=null){
        
       if($bid==null){
            $sth = $this->db->prepare("SELECT FishingId, BoatId, DateStart, DateFinish, (select SUM(fbf.Weight) FROM fishingbank fb RIGHT JOIN fishingbankfish fbf ON fb.FishingBankId=fbf.FishingBankId WHERE fb.FishingId=f.FishingId) as Catch from fishings f WHERE DateStart>=? and DateFinish<=?");
        
            $sth->execute(array($ds, $df));
            
             
            $sth->setFetchMode(PDO::FETCH_CLASS, 'Fishing');
            $fishings = [];
            while ($f = $sth->fetch()) {
                $f->Sailors = $this->getFishingSailors($f->FishingId);
                $f->Banks = $this->getFishingBanks($f->FishingId);
                $f->Boat = $this->getBoat($f->BoatId);
                $fishings[] = $f;
            }
       }else{
            $sth = $this->db->prepare("SELECT FishingId, DateStart, DateFinish, (select SUM(fbf.Weight) FROM fishingbank fb RIGHT JOIN fishingbankfish fbf ON fb.FishingBankId=fbf.FishingBankId WHERE fb.FishingId=f.FishingId) as Catch from fishings f WHERE f.BoatId=? and DateStart>=? and DateFinish<=?");
        
            $sth->execute(array($bid, $ds, $df));
            
             
            $sth->setFetchMode(PDO::FETCH_CLASS, 'Fishing');
            $fishings = $sth->fetchAll();
       }
        
        return $fishings;
    }
    
    public function getSailors(){
        $sth = $this->db->query("SELECT * FROM sailors");
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Sailor');
        return $sth->fetchAll();
    }
    
    private function getFishingSailors($fid){
        $sth = $this->db->prepare("SELECT s.SailorId as SailorId, s.Name as Name, s.Surname as Surname, fs.Position as Position, s.Address FROM fishingsailor fs JOIN sailors s ON fs.SailorId = s.SailorId WHERE fs.FishingId=?");
        $sth->execute(array($fid));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Sailor');
        return $sth->fetchAll();
    }
    
    private function getFishingBanks($fid){
        $sth = $this->db->prepare("SELECT fb.FishingBankId as FishingBankId, b.Name as Name, fb.Quality as Quality, fb.DateStart as DateStart, fb.DateFinish as DateFinish FROM fishingbank fb join banks b on fb.BankId = b.BankId WHERE fb.FishingId=?");
        $sth->execute(array($fid));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'FishingBank');
        $banks = [];
        while ($b = $sth->fetch()) {
            $b->Catches = $this->getBankCatches($b->FishingBankId);
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
    
    private function getBankCatches($id){
        $sth = $this->db->prepare("SELECT FishType, Weight from fishingbankfish where FishingBankId=?");
        $sth->execute(array($id));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'FishCatch');
        return $sth->fetchAll();
        
    }
    
    private function getBankBoats($bid, $ds, $df){
        $sth = $this->db->prepare("SELECT DISTINCT b.BoatId, b.Name, b.Type from fishingbank fb JOIN fishings f on fb.FishingId = f.FishingId JOIN boats b on f.BoatId=b.BoatId where fb.BankId = ? and fb.DateStart>? and fb.DateFinish<?");
        
        $sth->execute(array($bid, $ds, $df));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Boat');
        return $sth->fetchAll();
    }
    
    public function getMaxCatchBoats($type, $ds, $df){
        $sth = $this->db->prepare("SELECT f.BoatId, b.Name, SUM(fbf.Weight) as Catch from fishings f JOIN boats b ON f.BoatId=b.BoatId RIGHT JOIN fishingbank fb ON f.FishingId=fb.FishingId RIGHT JOIN fishingbankfish fbf ON fb.FishingBankId=fbf.FishingBankId WHERE fbf.FishType=? and f.DateStart>? and f.DateFinish<? GROUP BY f.BoatId ORDER BY SUM(fbf.Weight) DESC LIMIT 3");
        $sth->execute(array($type, $ds, $df));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Boat');
        
        return $sth->fetchAll();
    }

    public function getBanksAvgCatch($ds, $df){
        $sth = $this->db->prepare("SELECT b.Name, b.BankId, AVG(w.Sum) as AvgCatch from fishingbank fb JOIN banks b on fb.BankId = b.BankId RIGHT JOIN (select FishingBankId, SUM(Weight) as Sum FROM fishingbankfish GROUP BY FishingBankId) w on fb.FishingBankId = w.FishingBankId 
        where fb.DateStart>? and DateFinish<? GROUP BY fb.BankId");
        
        $sth->execute(array($ds, $df));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Bank');
        $banks=[];
        while ($s = $sth->fetch()) {
            $s->Boats = $this->getBankBoats($s->BankId, $ds, $df);
            $banks[] = $s;
        }
        
        return $banks;
    }
    public function getBankBoatsAboveAvg($bid){
        $sth = $this->db->prepare("SELECT *  FROM (SELECT b.BoatId, b.Name, SUM(fbf1.Weight) as Catch, avg.AvgCatch FROM fishings f RIGHT JOIN fishingbank fb1 ON f.FishingId=fb1.FishingId JOIN (SELECT fb.BankId, AVG(w.Sum) as AvgCatch from fishingbank fb RIGHT JOIN (select FishingBankId, SUM(Weight) as Sum FROM fishingbankfish GROUP BY FishingBankId) w on fb.FishingBankId = w.FishingBankId 
         GROUP BY fb.BankId) avg ON avg.BankId=fb1.BankId JOIN fishingbankfish fbf1 ON fb1.FishingBankId=fbf1.FishingBankId JOIN boats b ON f.BoatId=b.BoatId WHERE fb1.BankId=? GROUP BY f.BoatId) as tt WHERE tt.Catch>tt.AvgCatch");
        
        $sth->execute(array($bid));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Boat');
        
        return $sth->fetchAll();
    }

    public function getFish($ds, $df){
        
        $sth = $this->db->prepare("SELECT fbf.FishType, SUM(fbf.Weight) as Catch from fishings f JOIN fishingbank fb ON f.FishingId=fb.FishingId RIGHT JOIN fishingbankfish fbf on fb.FishingBankId = fbf.FishingBankId where f.DateStart>? and f.DateFinish<? GROUP BY fbf.FishType");
        
        $sth->execute(array($ds, $df));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Fish');
        
        $fish=[];
        while ($s = $sth->fetch()) {
            $s->Fishings = $this->getFishFishings($s->FishType, $ds, $df);
            $fish[] = $s;
        }
        
        return $fish;
    }
    
    private function getFishFishings($type, $ds, $df){
        $sth = $this->db->prepare("SELECT f.FishingId, b.Name as BoatName, f.DateStart, f.DateFinish, SUM(fbf.Weight) as Catch from fishings f JOIN boats b ON f.BoatId=b.BoatId RIGHT JOIN fishingbank fb ON f.FishingId=fb.FishingId RIGHT JOIN fishingbankfish fbf ON fb.FishingBankId=fbf.FishingBankId 
        WHERE fbf.FishType=? and f.DateStart>? and f.DateFinish<?
        GROUP BY f.FishingId");
        
        $sth->execute(array($type, $ds, $df));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Fishing');
        return $sth->fetchAll();
    }

    public function getBankFishFishings($bid, $type){
        $sth = $this->db->prepare("SELECT f.FishingId, b.Name as BoatName, f.DateStart, f.DateFinish, SUM(fbf.Weight) as Catch from fishings f JOIN boats b ON f.BoatId=b.BoatId RIGHT JOIN fishingbank fb ON f.FishingId=fb.FishingId RIGHT JOIN fishingbankfish fbf ON fb.FishingBankId=fbf.FishingBankId 
        WHERE fbf.FishType=? and fb.BankId=?
        GROUP BY f.FishingId");
        
        $sth->execute(array($type, $bid));
        $sth->setFetchMode(PDO::FETCH_CLASS, 'Fishing');
        return $sth->fetchAll();
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
            $res = $this->genInsertQuery($sailors[$i],"fishingsailor");
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
        $res = $this->genInsertQuery($bank,"fishingbank");
        $s = $this->db->prepare($res[0]);
        if($res[1][0]!=null){
            $s->execute($res[1]);
        }
        $id = $this->db->lastInsertId();
        for($i = 0; $i<count($catches); $i++){
            $catches[$i]['FishingBankId']=$id;
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

    public function updateBoat($id, $boat){
        $a = $this->genUpdateQuery($boat['Keys'], $boat['Values'], "boats", $id);
        $s = $this->db->prepare($a[0]);
        $s->execute($a[1]);
        return $a;
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