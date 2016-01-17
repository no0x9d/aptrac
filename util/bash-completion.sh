###-begin-aptrac-completion-###
#
# aptrac command completion script
#
# Installation: aptrac completion >> ~/.bashrc
# Or: aptrac completion > /usr/local/etc/bash_completion.d/npm
#
_aptrac()
{
    local cur cmd cmds opts
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    cmd="${COMP_WORDS[1]}"

    if [[ ${cur} == ${cmd} ]]; then
        cmds=( "$(aptrac completion --cmd)" )
        COMPREPLY=( $(compgen -W "${cmds}" -- ${cur}) )
        return 0
    else
        opts=( "$(aptrac completion --op ${cmd})" )
        COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
        return 0
    fi
    return 0
}
complete -F _aptrac aptrac
###-end-aptrac-completion-###