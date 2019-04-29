<?php
class Boat{
    public $BoatId;
    public $Name;
    public $Type;
    public $Displacement;
    public $BuildDate;
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

    public $Boat;
    public $Banks;
    public $Sailors;
}

class FishingBank{
    public $Bank;
    public $DateStart;
    public $DateFinish;
    public $Quality;

    public $Catches;
}

class FishCatch{
    public $FishType;
    public $Weight;
}

class Sailor{
    public $SalorId;
    public $Name;
    public $Surname;
    public $Address;
    public $Position;
}

?>