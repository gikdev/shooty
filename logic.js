/*** Healthy ***/
var HP = 100;
var enemy_gun_sound = new Audio("bang.mp3");
enemy_gun_sound.volume = 0.6;
var my_gun_sound = new Audio("bang.mp3");
var music = new Audio("music.mp3");
music.loop = true;
function $(e){
  return document.querySelector(e)
}
function $$(e){
  return document.querySelectorAll(e)
}
function live_enemies(){
  return $$(".enemy:not(.dead)")
}
function new_game(){
  random_enemy_attacks();
  $("#new_game").style.display = "none";
  music.play();
}
/*** Bugly ***/
function i_shoot(enemy){
  my_gun_sound.play();
  enemy.classList.add("dead");
  if (live_enemies().length < 1) {
    setTimeout(function(){
      alert("You won!");
      window.location.reload()
    }, 3000)
  }
}
function update_HP(po){
  HP -= po;
  $("#h").style.width = HP + "%";
  if (HP < 1){
    setTimeout(function(){
      alert("Game Over!");
      window.location.reload()
    }, 2000);
  }
}
function enemy_attacks(enemy){
  enemy.classList.add("showing");
  setTimeout(function(){
    enemy_shoots(enemy)
  }, 1000);
  setTimeout(function(){
    enemy.classList.remove("showing")
  }, 3000);
}
function enemy_shoots(enemy){
  if (enemy.classList.contains("dead")){
    return
  }else{
    enemy_gun_sound.play();
    enemy.classList.add("shooting");
    update_HP(20);
    setTimeout(function(){
      enemy.classList.remove("shooting");
    }, 200)
  }
}
function random_enemy_attacks(){
  let random_enemy_no = Math.random() * live_enemies().length;
  random_enemy_no = Math.floor(random_enemy_no);
  let enemy = live_enemies()[random_enemy_no];
  let random_delay = Math.random() * 2000 + 1000;
  setTimeout(function(){
    enemy_attacks(enemy)
    random_enemy_attacks(enemy)
  }, random_delay);
}