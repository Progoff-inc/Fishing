<?php
require 'repository.php';
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

$ctxt = new DataBase();
if(isset($_GET['Key']))
{
    
    switch ($_GET['Key']) {
        case 'get-banks':
            echo json_encode($ctxt->getBanks());
            break;
        case 'get-boats':
            echo json_encode($ctxt->getBoats());
            break;
        case 'get-sailors':
            echo json_encode($ctxt->getSailors());
            break;
        case 'get-boats-fishings':
            echo json_encode($ctxt->getBoatsFishings($_GET['Type'], $_GET['DateStart'], $_GET['DateFinish']));
            break;
        case 'get-fishings':
            echo json_encode($ctxt->getFishings($_GET['DateStart'], $_GET['DateFinish']));
            break;
        case 'get-max-catch-fidhings':
            echo json_encode($ctxt->getMaxCatchBoats($_GET['FishType'], $_GET['DateStart'], $_GET['DateFinish']));
            break;
        case 'get-banks-avg-catch':
            echo json_encode($ctxt->getBanksAvgCatch($_GET['DateStart'], $_GET['DateFinish']));
            break;
        case 'get-bank-boats-above-avg':
            echo json_encode($ctxt->getBankBoatsAboveAvg($_GET['Id']));
            break;
        case 'get-fish':
            echo json_encode($ctxt->getFish($_GET['DateStart'], $_GET['DateFinish']));
            break;
        case 'get-free-boats':
            echo json_encode($ctxt->getFreeBoats($_GET['DateStart'], $_GET['DateFinish']));
            break;
        case 'get-free-sailors':
            echo json_encode($ctxt->getFreeSailors($_GET['DateStart'], $_GET['DateFinish']));
            break;
        case 'get-bank-fish-fishings':
            echo json_encode($ctxt->getBankFishFishings($_GET['Id'], $_GET['FishType']));
            break;
        case 'add-boat':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addBoat($b));
            break;
        case 'add-sailor':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addSailor($b));
            break;
        case 'add-fishing':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addFishing($b));
            break;
        case 'add-fishing-bank':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addFishingBank($b));
            break;
        case 'add-bank':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addBank($b));
            break;
        case 'update-boat':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->updateBoat($_GET['Id'], $b));
            break;
        // case 'upload-file':
        //     $inp = json_decode(file_get_contents('php://input'), true);
        //     echo json_encode(array($ctxt->uploadFile($_GET['Id'], $_FILES, $_GET['Type'])));
        //     break;
        default:
            echo "Введенный ключ несуществует";
        
    }
    
}
else
{  
    echo "Введенные данные некорректны";
}
?>