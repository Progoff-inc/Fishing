<?php
class Boat{
    $BoatId;
    $Name;
    $Type;
    $Displacement;
    $BuildDate;
}

class Bank{
    $BankId;
    $Name;
}

class Fishing{
    $FishingId
    $BoatId;
    $DateStart;
    $DateFinish;

    $Boat;
    $Banks;
    $Sailors;
}

class FishingBank{
    $Bank;
    $DateStart;
    $DateFinish;
    $Quality;

    $Catches;
}

class Catch{
    $FishType;
    $Weight;
}

class Sailor{
    $SalorId;
    $Name;
    $Surname;
    $Address;
    $Position;
}

?>