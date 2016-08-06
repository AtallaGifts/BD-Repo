//META{"name":"SnUModifier"}*//

class SnUModifier {
    constructor() {
        this.defaultSettings = {
            "snumod-settings-nicknames": {
                name: "Nicknames",
                description: "Modify usernames with nicknames.",
                state: true
            },
            "snumod-settings-colours": {
                name: "Colours",
                description: "Modify usernames with colours.",
                state: true
            },
            "snumod-settings-avatars": {
                name: "Avatars",
                description: "Modify the avatar of users.",
                state: true
            },
            "snumod-settings-server-icons": {
                name: "Server Icons",
                description: "Modify server icons.",
                state: true
            },
            "snumod-settings-server-names": {
                name: "Server Names",
                description: "Modify server names.",
                state: true
            },
            "snumod-settings-channel-names": {
                name: "Channel Names",
                description: "Modify channel names.",
                state: true
            },
            "snumod-settings-override-nicknames": {
                name: "Enable Nickname",
                description: "Override Server and Group nicknames with Global nicknames.",
                state: false
            },
            "snumod-settings-override-colours": {
                name: "Enable Nickname",
                description: "Override Server and Group colours with Global colours.",
                state: false
            },
            "snumod-settings-override-avatars": {
                name: "Enable Nickname",
                description: "Override Server and Group avatars with Global avatars.",
                state: false
            }
        };
    }

    start() {
        this.utility = new BDUtility({
            repository: "Natsulus/BD-Repo",
            plugin: this,
            console: "SnU Modifier",
            style: "font-weight: bold;color: maroon;"
        });
        this.utility.info("Enabled Plugin");

        const css = `.snumod-input {
            margin-top: none;
        } 
        .snumod-label {
            margin-top: 7px; display: inline-block;
            vertical-align: middle;
        }
        .snumod-checkbox {
            margin-top: 7px;
        }

        .snumod-form-inner {
            padding-bottom: 28px !important;
        }`;

        BdApi.injectCSS("snumod-css", css);

        this.currentUser = this.utility.getUser();
        this.utility.info("Current User:", this.currentUser);

        SnUModifier.currentInstance = this;
        this.createSettingsPanel();

        // Add Tab Bar Button when Enabling
        if ($("form.form.settings.user-settings-modal").length > 0) {
            $(".tab-bar.SIDE").first().append(this.settingsButton);
            $(".form .settings-right .settings-inner").last().after(this.settingsPanel);
        }

        this.utility.loadScript("jQuery.serializeObject", "https://cdnjs.cloudflare.com/ajax/libs/jQuery.serializeObject/2.0.3/jquery.serializeObject.min.js");
        this.utility.loadScript("tinyColorPicker", "https://cdnjs.cloudflare.com/ajax/libs/tinyColorPicker/1.1.1/jqColorPicker.min.js");
    }

    stop() {
        this.utility.unloadScript("tiny-Color-Picker");
        this.utility.info("Disabled Plugin");
    }

    observer(ev) {
        if (ev.addedNodes.length === 1) {
            if ($(ev.target).find("form.form.settings.user-settings-modal").length > 0) {
                // User Settings Opened
                this.settingsPanel.hide();

                $(".tab-bar.SIDE .tab-bar-item:not(#bd-settings-new)").click(() => {
                    $(".form .settings-right .settings-inner").first().show();
                    $("#snumod-settings-new").removeClass("selected");
                    this.settingsPanel.hide();
                });

                const tabBarSide = $(".tab-bar.SIDE").first();
                const tabBarSet = setInterval(() => {
                    const bdtab = $("#bd-settings-new");

                    if (bdtab.length > 0) {
                        clearInterval(tabBarSet);
                        tabBarSide.append(this.settingsButton);
                        $("#snumod-settings-new").removeClass("selected");
                        bdtab.click(() => {
                            $("#snumod-settings-new").removeClass("selected");
                            this.settingsPanel.hide();
                        });
                    }
                });

                $(".form .settings-right .settings-inner").last().after(this.settingsPanel);
                $("#snumod-settings-new").removeClass("selected");
            } else if (ev.addedNodes[0].classList && ev.addedNodes[0].classList.contains("context-menu") && !ev.target.classList.contains("item-subMenu")) {
                if (!this.utility.getReactInstance(ev.addedNodes[0])) return;

                $(ev.addedNodes[0]).prepend(this.attachContextButton(this.utility.getReactProps(ev.addedNodes[0])));
            }
        }
    }

    // Core //

    modify() {
        //
    }

    modifyNicknames() {
        // messages ".user-name"
        // member list ".member-username-inner"
        // voice channel ".channel-voice-states li span"
        // user popout ".user-popout .username-wrapper"
        // group system message ".system-message-content a"
        // DM List ".channel.private span.channel-name"
        // DM Channel Title "a.channel-name.channel-private"
        // Friends List ".friends-row .discord-tag"

        const userPopout = $(".user-popout .username-wrapper");

        if (userPopout.hasClass("has-nickname")) {
            // modify nickname
        } else {
            // create nickname section
        }

        // get react data to check for server/group/global
    }

    modifyNameColours() {
        //
    }

    modifyTextColours() {
        //
    }

    modifyAvatars() {
        //
    }

    modifyServerIcons() {
        //
    }

    modifyServerNames() {
        //
    }

    modifyChannelNames() {
        //
    }

    // Settings //

    createSettingsPanel() {
        // Create Panel
        this.settingsPanel = $("<div>", {
            id: "snumod-pane",
            class: "settings-inner",
            css: {display: "none"}
        });

        let settingsLastTab;

        const changeSettingsTab = tab => {
            settingsLastTab = tab;

            $(".snumod-tab").removeClass("selected");
            $(".snumod-pane").hide();
            $(`#${tab}-tab`).addClass("selected");
            $(`#${tab}-pane`).show();

            // Unique Tab Change Actions
            switch (tab) {
                case "snumod-settings": {
                    break;
                }
                case "snumod-modifiers": {
                    break;
                }
                case "snumod-updates": {
                    // check for updates
                    break;
                }
            }
        };

        let list;
        const content = {};
        const scroller = $("<div>", {class: "scroller-wrap"});
        const settings = $("<div>", {class: "scroller settings-wrapper settings-panel"});
        const tabs = $("<div>", {class: "tab-bar TOP"});
        const panes = $("<div>", {class: "snumod-settings"});

        // Settings //
        tabs.append($("<div>", {
            class: "tab-bar-item snumod-tab",
            id: "snumod-settings-tab",
            text: "Settings",
            click: ev => {
                ev.stopImmediatePropagation();
                changeSettingsTab("snumod-settings");
            }
        }));

        list = $("<ul>", {class: "checkbox-group snumod-checkbox-group"});

        // loop settings and make <li> checkboxes

        list = "Settings are not available till v1.0.0"; // temp notice

        content.settings = $("<div>", {class: "control-groups"}).append($("<div>", {class: "control-group"})
            .append($("<label>", {
                style: "margin-bottom: 12px",
                text: "Other"
            })).append(list));

        panes.append($("<div>", {
            class: "snumod-pane",
            id: "snumod-settings-pane",
            style: "display: none"
        }).append(content.settings));

        // Modifiers //
        tabs.append($("<div>", {
            class: "tab-bar-item snumod-tab",
            id: "snumod-modifiers-tab",
            text: "Modifiers",
            click: ev => {
                ev.stopImmediatePropagation();
                changeSettingsTab("snumod-modifiers");
            }
        }));

        content.modifiers = {};
        content.modifiers.menu = $("<div>", {class: "control-groups"}).append(`Full Modifiers Menu to come in future update.`);

        panes.append($("<div>", {
            class: "snumod-pane",
            id: "snumod-modifiers-pane",
            style: "display: none"
        }).append(content.modifiers.menu));

        // Updates //
        tabs.append($("<div>", {
            class: "tab-bar-item snumod-tab",
            id: "snumod-updates-tab",
            text: "Updates",
            click: ev => {
                ev.stopImmediatePropagation();
                changeSettingsTab("snumod-updates");
            }
        }));

        // Labels: Version (Display Current Version and New Version Notice), Update Log (Display Update Log)
        content.updates = $("<div>", {class: "control-groups"}).append(`Updates Page not available till v1.0.0`);

        panes.append($("<div>", {
            class: "snumod-pane",
            id: "snumod-updates-pane",
            style: "display: none"
        }).append(content.updates));

        // Construct Panel
        settings.append(tabs);
        settings.append(panes);
        scroller.append(settings);
        this.settingsPanel.append(scroller);

        // Create Tab Bar Button Action
        const showSettings = () => {
            $(".tab-bar-item").removeClass("selected");
            this.settingsButton.addClass("selected");
            $(".form .settings-right .settings-inner").hide();

            this.settingsPanel.show();

            if (typeof settingsLastTab === "undefined") changeSettingsTab("snumod-settings");
            else changeSettingsTab(settingsLastTab);
        };

        // Create Tab Bar Button
        this.settingsButton = $("<div>", {
            class: "tab-bar-item snumod-tab-bar-item",
            text: "SnU Modifier",
            id: "snumod-settings-new",
            click(ev) {
                ev.stopImmediatePropagation();
                showSettings();
            }
        });
    }

    // Context Menu & Modals //

    attachContextButton(props) {
        if (props.type.startsWith("USER_")) {
            const globalUsersType = ["USER_CHANNEL_TITLE", "USER_PRIVATE_CHANNELS", "USER_PRIVATE_CHANNELS_MESSAGE", "USER_FRIEND_LIST"];
            const groupUsersType = ["USER_GROUP_DM", "USER_CALL_AVATAR"];
            const serverUsersType = ["USER_CHANNEL_VOICE", "USER_CHANNEL_MESSAGE", "USER_CHANNEL_MEMBERS"];

            if (globalUsersType.includes(props.type)) return this.createItemGroup(this.createUserModal, props, "Global");
            else if (groupUsersType.includes(props.type)) return this.createItemGroup(this.createUserModal, props, "Group");
            else if (serverUsersType.includes(props.type)) return this.createItemGroup(this.createUserModal, props, "Server");

            this.utility.error(`Unknown Type: ${props.type}`);
        } else if (props.type.startsWith("CHANNEL_")) {
            const textChannelType = ["CHANNEL_TITLE", "CHANNEL_TOPIC", "CHANNEL_LIST_TEXT"];
            const voiceChannelType = ["CHANNEL_LIST_VOICE"];

            if (textChannelType.includes(props.type)) return this.createItemGroup(this.createChannelModal, props, "Text");
            else if (voiceChannelType.includes(props.type)) return this.createItemGroup(this.createChannelModal, props, "Voice");

            this.utility.error(`Unknown Type: ${props.type}`);
        } else if (props.type.startsWith("GUILD_")) {
            const serverType = ["GUILD_ICON_BAR", "GUILD_HEADER"];

            if (serverType.includes(props.type)) return this.createItemGroup(this.createServerModal, props);

            this.utility.error(`Unknown Type: ${props.type}`);
        }
    }

    createItemGroup(createModal, props, type) {
        let usc;

        if (createModal.name.includes("User")) usc = `${type} User`;
        else if (createModal.name.includes("Server")) usc = "Server";
        else if (createModal.name.includes("Channel")) usc = `${type} Channel`;

        return $("<div>", {class: "item-group snumod-item-group"})
            .append($("<div>", {
                class: "item snumod-item",
                click: ev => {
                    ev.stopImmediatePropagation();
                    // Close the Menu
                    $(".context-menu").empty();

                    // Get THE span
                    const span = $("<span>", {class: "snumod-modal-span"});

                    span.append(this.createBackdrop(span));
                    span.append(createModal(props, type));

                    $("#app-mount").find(">:first-child").append(span);

                    $("#snumod-usernickname, #snumod-servername, #snumod-channelname").focus().select();
                }
            }).append(`<span>Modify ${usc}</span><div class="hint"></div>`));
    }

    createBackdrop(span) {
        const backdrop = $("<div>", {
            class: "callout-backdrop",
            style: "opacity: 0; transform: translateZ(0px); background-color: rgb(0, 0, 0);",
            click(ev) {
                ev.stopImmediatePropagation();

                span.children(".callout-backdrop").animate({opacity: 0}, 100, "linear");
                span.children(".modal").animate({opacity: 0}, {
                    duration: 100,
                    easing: "linear",
                    progress: (anim, prog) => {
                        $(anim.elem).css("transform", `scale(${1 - 0.35 * prog})`);
                    },
                    complete() {
                        span.remove();
                    }
                });
            }
        });

        backdrop.animate({opacity: 0.85}, 100, "linear");

        return backdrop;
    }

    createUserModal(props, type) {
        const header = $("<div>", {class: "form-header snumod-form-header"}).append(`<header>Modify ${props.user.username} (${type})</header>`);

        const inner = $("<div>", {class: "form-inner snumod-form-inner"}).append($("<div>", {class: "control-group"})
            .append($("<label for='snumod-usernickname' class='snumod-label'>Nickname</label>"))
            .append($("<input>", {
                type: "text",
                class: "snumod-input",
                id: "snumod-usernickname",
                name: "nickname",
                placeholder: props.user.username,
                value: "" // get ${type} from modifier || ""
            }))
            .append($("<label for='snumod-useravatar' class='snumod-label'>Avatar URL</label>"))
            .append($("<input>", {
                type: "text",
                class: "snumod-input",
                id: "snumod-useravatar",
                name: "avatar",
                placeholder: props.user.avatar ? `https://cdn.discordapp.com/avatars/${props.user.id}/${props.user.avatar}.jpg` : "",
                value: ""
            }))
            .append($("<label for='snumod-usernamecolour' class='snumod-label'>Name Colour</label>"))
            .append($("<input>", {
                type: "text",
                class: "snumod-input",
                id: "snumod-usernamecolour",
                name: "namecolour",
                placeholder: "#",
                value: "" // get ${type} from modifier || ""
            }))
            .append($("<label for='snumod-usertextcolour' class='snumod-label'>Text Colour</label>"))
            .append($("<input>", {
                type: "text",
                class: "snumod-input",
                id: "snumod-usertextcolour",
                name: "textcolour",
                placeholder: "#",
                value: "" // get ${type} from modifier || ""
            }))
            .append($("<div>", {class: "control-group snumod-reset"}).append("<br><label><a>Reset All</a></label><br>"))
            .append($("<div>", {class: "checkbox snumod-checkbox"}).append($("<div>", {class: "checkbox-inner"}))));

        inner.find(".checkbox-inner").append($("<input>", {
            type: "checkbox",
            id: "snumod-globalcheck",
            name: "globalcheck"
        }).prop("checked", type === "Global")).append("<span></span>")
            .after($("<label for='snumod-globalcheck' class='snumod-label'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Modify Global</label>"));

        let disabled = false;

        if (type === "Global") {
            inner.find("#snumod-globalcheck").prop("disabled", true);
            disabled = true;
            inner.find(".checkbox").after($("<input>", {
                type: "hidden",
                class: "snumod-input",
                id: "snumod-globalcheck-hidden",
                name: "globalcheck",
                value: "on"
            }));
        }

        inner.find(".checkbox").click(ev => {
            if (disabled) return;
            const cb = $(ev.currentTarget).children().find('input[type="checkbox"]');
            const enabled = !cb.is(":checked");

            if (enabled) { // get global from modifiers || ""
                inner.find("#snumod-usernickname").val("");
                inner.find("#snumod-useravatar").val("");
                inner.find("#snumod-usernamecolour").val("");
                inner.find("#snumod-usertextcolour").val("");
            } else {
                $(".snumod-form").trigger("reset");
            }

            cb.prop("checked", enabled);
            if (enabled) header.find("header").text(`Modify ${props.user.username} (Global)`);
            else header.find("header").text(`Modify ${props.user.username} (${type})`);
        });

        inner.find(".snumod-reset").click(() => {
            const cb = inner.children().find('input[type="checkbox"]');
            const enabled = cb.is(":checked");

            if (type !== "Global" && enabled) { // get global from modifiers || ""
                inner.find("#snumod-usernickname").val("");
                inner.find("#snumod-useravatar").val("");
                inner.find("#snumod-usernamecolour").val("");
                inner.find("#snumod-usertextcolour").val("");
            } else {
                $(".snumod-form").trigger("reset");
            }
            if (enabled) cb.prop("checked", enabled);
        });

        const buttons = $("<div>", {class: "form-actions snumod-form-actions"})
            .append($("<button>", {
                class: "btn btn-default",
                text: "Cancel",
                type: "button",
                click: () => {
                    const span = $(".snumod-modal-span");

                    span.children(".callout-backdrop").animate({opacity: 0}, 100, "linear");
                    span.children(".modal").animate({opacity: 0}, {
                        duration: 100,
                        easing: "linear",
                        progress: (anim, prog) => {
                            $(anim.elem).css("transform", `scale(${1 - 0.35 * prog})`);
                        },
                        complete() {
                            span.remove();
                        }
                    });
                }
            })).append($("<button>", {
                class: "btn btn-primary",
                text: "Save",
                type: "submit"
            }));

        const modal = $("<div>", {
            class: "modal",
            style: "opacity: 0; transform: scale(0.65) translateZ(0px);"
        }).append($("<div>", {class: "modal-inner"})
            .append($("<form>", {class: "form snumod-form"})
                .append(header)
                .append(inner)
                .append(buttons)
                .on("submit", ev => {
                    ev.preventDefault();
                    console.log($(ev.target).serializeObject());
                    // manage data

                    const span = $(".snumod-modal-span");

                    span.children(".callout-backdrop").animate({opacity: 0}, 100, "linear");
                    span.children(".modal").animate({opacity: 0}, {
                        duration: 100,
                        easing: "linear",
                        progress: (anim, prog) => {
                            $(anim.elem).css("transform", `scale(${1 - 0.35 * prog})`);
                        },
                        complete() {
                            span.remove();
                        }
                    });
                })));

        modal.animate({opacity: 1}, {
            duration: 100,
            easing: "linear",
            progress: (anim, prog) => {
                $(anim.elem).css("transform", `scale(${0.35 * prog + 0.65})`);
            }
        });

        return modal;
    }

    createServerModal(props) {
        const header = $("<div>", {class: "form-header"}).append(`<header>Modify ${props.guild.name}</header>`);

        const inner = $("<div>", {class: "form-inner snumod-form-inner"}).append($("<div>", {class: "control-group"})
            .append($("<label for='snumod-servername' class='snumod-label'>Server Name</label>"))
            .append($("<input>", {
                type: "text",
                class: "snumod-input",
                id: "snumod-servername",
                name: "name",
                placeholder: props.guild.name,
                value: ""
            }))
            .append($("<label for='snumod-servericon' class='snumod-label'>Icon URL</label>"))
            .append($("<input>", {
                type: "text",
                class: "snumod-input",
                id: "snumod-servericon",
                name: "icon",
                placeholder: props.guild.icon ? `https://cdn.discordapp.com/icons/${props.guild.id}/${props.guild.icon}.jpg` : "",
                value: ""
            }))
            .append($("<div>", {class: "control-group snumod-reset"}).append("<br><label><a>Reset All</a></label><br>")));

        inner.find(".snumod-reset").click(() => {
            $(".snumod-form").trigger("reset");
        });

        const buttons = $("<div>", {class: "form-actions snumod-form-actions"})
            .append($("<button>", {
                class: "btn btn-default",
                text: "Cancel",
                type: "button",
                click: () => {
                    const span = $(".snumod-modal-span");

                    span.children(".callout-backdrop").animate({opacity: 0}, 100, "linear");
                    span.children(".modal").animate({opacity: 0}, {
                        duration: 100,
                        easing: "linear",
                        progress: (anim, prog) => {
                            $(anim.elem).css("transform", `scale(${1 - 0.35 * prog})`);
                        },
                        complete() {
                            span.remove();
                        }
                    });
                }
            })).append($("<button>", {
                class: "btn btn-primary",
                text: "Save",
                type: "submit"
            }));

        const modal = $("<div>", {
            class: "modal",
            style: "opacity: 0; transform: scale(0.65) translateZ(0px);"
        }).append($("<div>", {class: "modal-inner"})
            .append($("<form>", {class: "form snumod-form"})
                .append(header)
                .append(inner)
                .append(buttons)
                .on("submit", ev => {
                    ev.preventDefault();
                    console.log($(ev.target).serializeObject());
                    // manage data

                    const span = $(".snumod-modal-span");

                    span.children(".callout-backdrop").animate({opacity: 0}, 100, "linear");
                    span.children(".modal").animate({opacity: 0}, {
                        duration: 100,
                        easing: "linear",
                        progress: (anim, prog) => {
                            $(anim.elem).css("transform", `scale(${1 - 0.35 * prog})`);
                        },
                        complete() {
                            span.remove();
                        }
                    });
                })));

        modal.animate({opacity: 1}, {
            duration: 100,
            easing: "linear",
            progress: (anim, prog) => {
                $(anim.elem).css("transform", `scale(${0.35 * prog + 0.65})`);
            }
        });

        return modal;
    }

    createChannelModal(props, type) {
        const header = $("<div>", {class: "form-header"}).append(`<header>Modify ${type === "Text" ? "#" : ""}${props.channel.name} (${type})</header>`);

        const inner = $("<div>", {class: "form-inner snumod-form-inner"}).append($("<div>", {class: "control-group"})
            .append($("<label for='snumod-channelname' class='snumod-label'>Channel Name</label>"))
            .append($("<input>", {
                type: "text",
                class: "snumod-input",
                id: "snumod-channelname",
                name: "name",
                placeholder: props.channel.name,
                value: ""
            }))
            .append($("<div>", {class: "control-group snumod-reset"}).append("<br><label><a>Reset All</a></label><br>")));

        if (type === "Text") {
            inner.find("#snumod-channelname")
                .after($("<label for='snumod-channeltopic' class='snumod-label'>Channel Topic</label>"),
                    $("<input>", {
                        type: "text",
                        class: "snumod-input",
                        id: "snumod-channeltopic",
                        name: "topic",
                        placeholder: props.channel.topic,
                        value: ""
                    }));
        }

        inner.find(".snumod-reset").click(() => {
            $(".snumod-form").trigger("reset");
        });

        const buttons = $("<div>", {class: "form-actions snumod-form-actions"})
            .append($("<button>", {
                class: "btn btn-default",
                text: "Cancel",
                type: "button",
                click: () => {
                    const span = $(".snumod-modal-span");

                    span.children(".callout-backdrop").animate({opacity: 0}, 100, "linear");
                    span.children(".modal").animate({opacity: 0}, {
                        duration: 100,
                        easing: "linear",
                        progress: (anim, prog) => {
                            $(anim.elem).css("transform", `scale(${1 - 0.35 * prog})`);
                        },
                        complete() {
                            span.remove();
                        }
                    });
                }
            })).append($("<button>", {
                class: "btn btn-primary",
                text: "Save",
                type: "submit"
            }));

        const modal = $("<div>", {
            class: "modal",
            style: "opacity: 0; transform: scale(0.65) translateZ(0px);"
        }).append($("<div>", {class: "modal-inner"})
            .append($("<form>", {class: "form snumod-form"})
                .append(header)
                .append(inner)
                .append(buttons)
                .on("submit", ev => {
                    ev.preventDefault();
                    console.log($(ev.target).serializeObject());
                    // manage data

                    const span = $(".snumod-modal-span");

                    span.children(".callout-backdrop").animate({opacity: 0}, 100, "linear");
                    span.children(".modal").animate({opacity: 0}, {
                        duration: 100,
                        easing: "linear",
                        progress: (anim, prog) => {
                            $(anim.elem).css("transform", `scale(${1 - 0.35 * prog})`);
                        },
                        complete() {
                            span.remove();
                        }
                    });
                })));

        modal.animate({opacity: 1}, {
            duration: 100,
            easing: "linear",
            progress: (anim, prog) => {
                $(anim.elem).css("transform", `scale(${0.35 * prog + 0.65})`);
            }
        });

        return modal;
    }

    // Meta Data //

    getName() {
        return "SnU Modifier";
    }

    getDescription() {
        return "Modify users and servers.";
    }

    getVersion() {
        return "0.0.6";
    }

    getAuthor() {
        return `<a href="https://github.com/Natsulus" target="_BLANK">Natsulus</a>`;
    }

    // Unused //

    onMessage() {
        // v2
    }

    onSwitch() {
        // Better to use observer
    }

    getSettingsPanel() {
        // Using Custom Settings Panel
    }

    load() {
        // Deprecated in v2
    }

    unload() {
        // Deprecated in v2
    }
}