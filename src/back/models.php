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
    public $SailorId;
    public $DateStart;
    public $DateFinish;
    public $Catch;
    public $Position;

    public $Boat;
}

class FishingBank{
    public $Name;
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
    public $SailorId;
    public $Name;
    public $Surname;
    public $Address;
}

?>