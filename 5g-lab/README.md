# 5G-labtainer_AMICMA5G

# Documentation Technique : Déploiement du TP 5G (Open5GS + UERANSIM) sur Labtainer

# 1. Vue d’ensemble : Comment le TP est rendu possible ?

Le TP 5G repose sur :

1. **Labtainer** (orchestrateur pédagogique)
2. **Docker** (virtualisation par conteneurs)
3. **Open5GS** (5G Core)
4. **UERANSIM** (gNB + UE)

Le TP repose sur **Docker comme moteur de conteneurisation**.  
Toutefois, l’orchestration n’est **pas réalisée via Docker Compose**, mais via **Labtainer**, qui automatise :

- La création des conteneurs
- La création des réseaux virtuels
- L’attribution d’IP statiques
- L’injection des ressources système via `start.config`


# 2. Création du Lab

## Installation de l’environnement

Installer l’image Labtainer dans une machine virtuelle.

Lien officiel :  
https://nps.edu/web/c3o/virtual-machine-images


## Création du projet

Tous les labs se trouvent dans :
/labtainer/trunk/labs/
Créer un nouveau lab :
```
newlab 5g-lab
```
Ensuite créer le dossier des conteneurs nécessaires :
mkdir amf, mkdir smf, mkdir upf, mkdir gnb, mkdir ue1

# 3. Création de l’architecture réseau virtuelle

Le fichier principal est :

/labtainer/trunk/labs/5g-lab/config/start.config
Définition des réseaux :
```
NETWORK CORE
    MASK 172.22.0.0/24
    GATEWAY 172.22.0.101

NETWORK RAN
    MASK 172.25.0.0/24
    GATEWAY 172.25.0.101
```
Labtainer crée ces réseaux comme des bridges Docker internes.

CORE → réseau 5G Core

RAN → réseau radio simulé
# 4. Définition des conteneurs

Dans start.config, les conteneurs sont configurer comme suit :

CONTAINER amf
    USER ubuntu
    CORE 172.22.0.10
    TERMINAL_GROUP CORE
    TERMINALS 1
    X11 YES
    ADD-HOST CORE

Même principe pour : smf, upf, nrf, udm, udr, ausf, pcf, bsf, scp, gnb, ue1, ue2

Labtainer traduit cela en :

- Création d’un conteneur Docker

- Attribution IP statique

- Connexion au réseau défini

# 5. Construction des images Docker

Les Dockerfiles se trouvent dans :

/labtainer/trunk/labs/5g-lab/dockerfiles/

Le Dockerfile :

- Installe les paquets nécessaires

- Ajoute les fichiers système

- Définit la commande de démarrage

# 6. Installation du 5G Core (Open5GS)
**** Principe

Open5GS n’est pas compilé dans chaque conteneur.
Il est intégré sous forme binaire via le mécanisme sys_tar.

## a. Préparation du binaire

Extraction : tar xfz /mnt/hgfs/Documents/5GS.tgz

Dossier généré : open5gs/

## b. Création d’une archive unique
tar cvf open5gs.tar open5gs

## c. Injection via sys_tar

Chaque conteneur Core contient : sys_tar/

Labtainer utilise : sys_tar/sys.tar

Exemple pour SMF :
```
cd smf/sys_tar/
rm sys.tar
ln ../../open5gs.tar sys.tar
```

Même opération pour les autres conteneurs (les fonctions open5gs)

Open5GS est alors disponible dans : /open5gs/install/

# 7. Déploiement UERANSIM (RAN simulé)

UERANSIM permet d’émuler :

- Un gNB

- Un ou plusieurs UE

## a. Injection via sys_tar

Archive utilisée : ueransim.tar
Injection :
```
cd ue1/sys_tar/
rm sys.tar
cp ~/labtainer/trunk/labs/5g-lab/ueransim.tar sys.tar
```
## b. Fichiers de configuration

Stockés dans : labs/5g-lab/ueransim/config/

Copie vers les conteneurs :
```
docker cp ~/labtainer/trunk/labs/5g-lab/ueransim/config/open5gs-gnb.yaml \
5g-lab.gnb.student:/ueransim/config/open5gs-gnb.yaml

docker cp ~/labtainer/trunk/labs/5g-lab/ueransim/config/open5gs-ue.yaml \
5g-lab.ue1.student:/ueransim/config/open5gs-ue.yaml
```
## c. Vérification
```
docker exec -it 5g-lab.gnb.student cat /ueransim/config/open5gs-gnb.yaml
docker exec -it 5g-lab.ue1.student cat /ueransim/config/open5gs-ue.yaml
```
## d. Redémarrage
docker restart 5g-lab.gnb.student

# Basic Git Commands

If you are working from your local machine, here are the basic commands to update the remote repository:
```
cd existing_repo
git remote add origin https://gitlab.emse.fr/khadim.ba/5G-labtainer_AMICMA5G.git
git branch -M main
git push -uf origin main
```
# Auteurs
Khadim BA, Philippe JAILLON

# Statut du projet
En cours de development
