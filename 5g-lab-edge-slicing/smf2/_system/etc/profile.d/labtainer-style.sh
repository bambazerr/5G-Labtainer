#!/bin/bash

# Ne rien faire si shell non interactif
[ -z "$PS1" ] && return

case "$HOSTNAME" in
    upf1|smf1)
        GROUP_NAME="CLOUD"
        COLOR="\[\e[1;34m\]"
        ;;
    upf2|smf2|edge_server|cloud_server)
        GROUP_NAME="EDGE"
        COLOR="\[\e[1;32m\]"
        ;;
    gnb|ue1|ue2)
        GROUP_NAME="RAN"
        COLOR="\[\e[1;31m\]"
        ;;
    subscriber)
        GROUP_NAME="SUBSCRIBER"
        COLOR="\[\e[1;36m\]"
        ;;
    *)
        GROUP_NAME="S"
        COLOR="\[\e[1;36m\]"
        ;;
esac

# Titre fenêtre
echo -ne "\033]0;${GROUP_NAME}-${HOSTNAME}\007"

# Clear
clear

echo "================================================================================================"
echo "                                 ${GROUP_NAME} TERMINAL"
echo "================================================================================================"
echo ""

# Forcer le prompt APRÈS tout
PROMPT_COMMAND='PS1="'$COLOR'${GROUP_NAME} | \u@\h:\w\$ \[\e[0m\]"'
