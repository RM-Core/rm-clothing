local RMCore = exports.rm_core:getCore()
local playerData = {}
local inClothingMenu = false
local isPedChanging = false
local activeCamera = nil

function openClothingMenu(tabs, data, camera)
    activeCamera = camera
    playerData = data
    local playerClothes = {}
    local playerSkins = {}
    local sex = IsPedMale(PlayerPedId()) and 'male' or 'female'
    local clothes, skins = nil, nil
    local activeTabs = {}
    if tabs.clothes then
        clothes = lib.getClothes(sex)
        for k, v in pairs(clothes) do
            playerClothes[#playerClothes + 1] = {
                name = k,
                minValue = 0,
                maxValue = #v,
                currentValue = 0
            }
        end

        table.insert(activeTabs, 'clothes')
    end

    if tabs.skins then
        skins = lib.getSkins(sex)
        for k, v in pairs(skins) do
            playerSkins[#playerSkins + 1] = {
                name = k,
                minValue = 0,
                maxValue = #v,
                currentValue = 0
            }
        end

        playerSkins[#playerSkins + 1] = {
            name = "skin",
            minValue = 0,
            maxValue = 6,
            currentValue = 0
        }
        local features = lib.getFeatures()
        for k, v in pairs(features) do
            playerSkins[#playerSkins + 1] = {
                name = ('features_%s'):format(k),
                minValue = -100,
                maxValue = 100,
                currentValue = 0
            }
        end
        table.insert(activeTabs, 'heads')
    end

    SendNUIMessage({
        action = "openClothing",
        data = {
            clothes = playerClothes,
            skins = playerSkins,
            tabs = activeTabs
        }
    })
    SetNuiFocus(true, true)
    inClothingMenu = true
    startKeyPressCheck()
end

exports("openClothingMenu", openClothingMenu)

function startKeyPressCheck()
    while inClothingMenu do
        DisableAllControlActions(0)
        if IsDisabledControlJustPressed(0, 0x7065027D) then
            SetEntityHeading(cache.ped, GetEntityHeading(cache.ped) - 10)
        elseif IsDisabledControlJustPressed(0, 0xB4E465B4) then
            SetEntityHeading(cache.ped, GetEntityHeading(cache.ped) + 10)
        end
        Wait(0)
    end
end

RegisterNUICallback("changeValue", function(data, cb)
    cb(true)
    if isPedChanging then
        Wait(100)
        return
    end

    isPedChanging = true
    lib.renderPed(PlayerPedId(), data)
    isPedChanging = false
end)

RegisterNUICallback("saveOutfit", function(data, cb)
    cb(true)
    inClothingMenu = false
    SendNUIMessage({
        action = "hide",
        data = false
    })
    SetNuiFocus(false, false)

    playerData.outfitName = data.outfitName
    playerData.skin = lib.getAppearance('skin')
    playerData.outfit = lib.getAppearance('outfit')
    if playerData.firstname then
        TriggerServerEvent("rm:newCharacter", playerData)
        DoScreenFadeOut(0)
    else
        TriggerServerEvent("rm:newOutfit", playerData)
    end
end)

RegisterNUICallback('gotoCamera', function(data, cb)
    cb(true)
    local to = data.camera
    if to == "head" then
        local pCoordsOffset = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0, 0.75, 0.65)
        local headCamera = lib.createCam(pCoordsOffset,
            vector3(0.0, 0.0, GetEntityHeading(PlayerPedId()) + 180))
        SetCamActiveWithInterp(headCamera, activeCamera, 1000, 10.0, 10.0)
        activeCamera = headCamera
        Wait(1000)
    elseif to == "chest" then
        local pCoordsOffset = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0, 1.0, 0.0)
        local chestCamera = lib.createCam(pCoordsOffset,
            vector3(0.0, 0.0, GetEntityHeading(PlayerPedId()) + 180))
        SetCamActiveWithInterp(chestCamera, activeCamera, 1000, 10.0, 10.0)
        activeCamera = chestCamera
        Wait(1000)
    elseif to == "boots" then
        local pCoordsOffset = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0, 2.0, 0.0)
        local bootsCamera = lib.createCam(pCoordsOffset,
            vector3(0.0, 0.0, GetEntityHeading(PlayerPedId()) + 180))
        SetCamActiveWithInterp(bootsCamera, activeCamera, 1000, 10.0, 10.0)
        activeCamera = bootsCamera
        Wait(1000)
    elseif to == "default" then
        local pCoordsOffset = GetOffsetFromEntityInWorldCoords(PlayerPedId(), 0, 2.0, 0)
        local defaultCamera = lib.createCam(pCoordsOffset, vector3(0.0, 0.0, 0.0))
        SetCamActiveWithInterp(defaultCamera, activeCamera, 1000, 10.0, 10.0)
        activeCamera = defaultCamera
        Wait(1000)
    end
end)
