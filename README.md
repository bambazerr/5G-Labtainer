# 5G-Labtainer_AMICMA5G

This work is part of the **AMICMA IMTFor5G+ project**.

## 5g-lab

5G network deployment based on **Open5GS** and **UERANSIM**.

## 5g-lab2

Edge slicing with dual UPF architecture.

Main features:
- Open5GS 5G Core
- UERANSIM gNB and 2 UEs
- Cloud and Edge UPFs
- Network slicing
- MQTT and Modbus/TCP scenarios
- Wireshark analysis (NAS, NGAP, SBI)

## Method to run labs on Labtainer

These are two different labs, so you must use one of the folders to run a lab in Labtainer.

Move to the Labtainer labs directory:

```bash
cd ~/labtainer/trunk/labs/
```

**Note:** The `sys.tar` binaries are not pushed because they are too large.

The lab folders are therefore not complete in this repository.  
The complete version is available in the `.tgz` files.

For `5g-lab2`:

```bash
tar -xzf 5g-lab2.tgz
```

Rebuild the lab:

```bash
cd ~/labtainer/trunk/scripts/labtainer-student
rebuild.py -b 5g-lab2
```

Launch the lab:

```bash
labtainer 5g-lab2
```

## UERANSIM modification

The lab uses **UERANSIM 3.2.6**.

To improve stability in the Labtainer virtual environment, the RLS heartbeat threshold was increased from **2000 ms to 10000 ms** on both UE and gNB.

This prevents short VM scheduling delays from being interpreted as a radio link failure.

The source code was modified with:

```bash
sed -i 's/HEARTBEAT_THRESHOLD = 2000/HEARTBEAT_THRESHOLD = 10000/' \
    src/ue/rls/udp_task.cpp \
    src/gnb/rls/udp_task.cpp
```

After recompilation, the new `nr-gnb` and `nr-ue` binaries were copied into the Labtainer `sys_tar/ueransim/bin/` directories for `gnb`, `ue1` and `ue2`.

The lab was then rebuilt with:

```bash
cd ~/labtainer/trunk/scripts/labtainer-student
rebuild.py -b 5g-lab2
```

## Documentation

- `Manuel d'utilisation du lab.pdf`
- `Poster plateforme-5G-labtainer.pdf`

## Authors

Khadim BA, Philippe JAILLON

## Project status

In development
