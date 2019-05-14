<?php
class Boat{
    public $BoatId;
    public $Name;
    public $Type;
    public $Displacement;
    public $BuildDate;
}

class User{
    public $Id;
    public $Name;
    public $Email;
    public $Password;
    public $CreateDate;
}

class Bank{
    public $BankId;
    public $Name;
}

class Fishing{
    public $FishingId;
    public $BoatId;
    public $DateStart;
    public $DateFinish;
    public $Catch;

    public $Boat;
}

class FishingBank{
    public $Name;
    public $DateStart;
    public $DateFinish;
    public $Quality;
    public $FishingBankId;

    public $Catches;
}

class FishCatch{
    public $FishType;
    public $Weight;
}

class Sailor{
    public $SailorId;
    public $Name;
    public $Surname;
    public $Address;
}

class Fish{
    public $FishType;
    public $Fishings;
}

?>