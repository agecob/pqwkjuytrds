	var myApp = new Framework7();
	 
	// If we need to use custom DOM library, let's save it to $$ variable:
	var $$ = Dom7;
	 
	// Add view
	var mainView = myApp.addView('.view-main', {
	  // Because we want to use dynamic navbar, we need to enable it for this view:
	  dynamicNavbar: true
});

$(document).ready(function() {
	
	$("#username").inputmask("mask", {
		"mask": "999.999.999-99",
		placeholder: ""
	});
	
});

$('#entrar').on('click', function(){
	myApp.showPreloader('Carregando...');
	var formData = $("#login_form").serializeArray();

         $.ajax({
            type: "POST",
            url: "http://191.33.228.212:3000/tab-bar/ajax/login.php", 
            data: formData,            
            async: false,
            dataType: "json", 
            success: function (json) {

				if(json.result){
					//console.log(json.dados)
					var storedData = myApp.formStoreData('dados_usuario', json.dados);
					window.location="app.html"; 
				}else{
					myApp.hidePreloader();
					myApp.alert(json.msg,'Atenção')
				}
            },error: function(xhr,e,t){
                console.log(xhr.responseText);                
            }
        });
	
});


myApp.onPageInit('cadastro_usuario', function (page) {
  // "page" variable contains all required information about loaded and initialized page 
  
  	$("#cli_cpf").inputmask("mask", {
		"mask": "999.999.999-99",
		placeholder: ""
	});

	$(".fone_nro").inputmask("mask", {
		mask: ["(99) 9999-9999", "(99) 99999-9999" ],
		placeholder: ""
	});
	
	$(".cep").inputmask("mask", {
		mask: "99999-999",
		placeholder: ""
	});

	$('.cep').on('blur', function(){
	myApp.showPreloader('Buscando CEP...');
	su = this.name.substring(0, 3);
	console.log("#"+su+"_cidade")
	$("#cli_cidade").val("");
	$("#cli_estado").val("");

	consulta = $("#"+su+"_cep").val();
	consulta = consulta.replace('-', '');
		
	$.getScript("http://www.toolsweb.com.br/webservice/clienteWebService.php?cep="+consulta+"&formato=javascript", function(){
		cidade = resultadoCEP.cidade;
		uf = resultadoCEP.estado;
		$("#cli_cidade").val(cidade)
		$("#cli_estado").val(uf)
		myApp.hidePreloader();

	});
	
});

$('#btn_cadastro').on('click', function(){

	if($("#cli_nome").val()==''){
		myApp.alert('Digite o seu nome','Atenção!')
		return null;		
	}

	if($("#cli_cpf").val()==''||$("#cli_cpf").val().length<14){
		myApp.alert('CPF Inválido','Atenção!')
		return null;		
	}

	if($("#cli_email").val()==''){
		myApp.alert('Digite o seu e-mail','Atenção!')
		return null;		
	}

	if($("#cli_telefone").val()==''){
		myApp.alert('Digite o seu telefone','Atenção!')
		return null;		
	}	
	
	if($("#cli_senha").val()==''){
		myApp.alert('Digite uma senha','Atenção!')
		return null;		
	}	

	if($("#cli_senha2").val()==''){
		myApp.alert('Repita a senha','Atenção!')
		return null;		
	}	

	if($("#cli_senha").val()!=$("#cli_senha2").val()){
		myApp.alert('As senhas não conferem','Atenção!')
		return null;		
	}	

	if($("#cli_estado").val()==''){
		myApp.alert('Selecione um Estado','Atenção!')
		return null;		
	}	

	if($("#cli_cidade").val()==''){
		myApp.alert('Digite a sua Cidade','Atenção!')
		return null;		
	}	


	myApp.showPreloader('Cadastrando...');
	var formData = $("#form_cadastro").serializeArray();
	
         $.ajax({
            type: "POST",
            url: "http://191.33.228.212:3000/tab-bar/ajax/cadastro.php", 
            data: formData,            
            async: false,
            dataType: "json", 
            success: function (json) {
				if(json.result){
					
					  var storedData = myApp.formStoreData('dados_usuario', json.dados);
  
					myApp.hidePreloader();
					window.location="app.html"; 
				}else{
					myApp.hidePreloader();
					myApp.alert(json.msg,'Atenção')
				}
            },error: function(xhr,e,t){
                console.log(xhr.responseText);                
            }
        });
	
});



var bancos = ['Santander','Banco do Brasil','Caixa Econômica Federal','Itaú Unibanco','SICOOB','Bradesco','Banrisul','Banco BTG Pactual','BANCOOB','Banco da Amazônia','Banese','Banpará','Banco do Nordeste','Safra','Banco Mercantil','HSBC','ParanáBanco'];

var autocompleteDropdownSimple = myApp.autocomplete({
    input: '#cli_banco',
    openIn: 'dropdown',
    source: function (autocomplete, query, render) {
        var results = [];
        if (query.length === 0) {
            render(results);
            return;
        }
		
		//bancos = ['Santander','Banco do Brasil','Caixa Econômica Federal'];
		console.log(bancos);
        // Find matched items
        for (var i = 0; i < bancos.length; i++) {
            if (bancos[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(bancos[i]);
        }
        // Render items by passing array with result items
        render(results);
    }
});


})




