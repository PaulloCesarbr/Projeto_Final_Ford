import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccessibilityService } from '../../services/accessibility.service';

interface Substitute {
  name: string;
  ratio: string;
  benefits: string;
  details: string;
}

interface Ingredient {
  id: string;
  name: string;
  icon: string;
  category: string;
  substitutes: Substitute[];
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  searchQuery = '';
  selectedCategory = 'Todos';
  selectedIngredient: Ingredient | null = null;

  categories = ['Todos', 'Adoçantes', 'Grãos / Farinhas', 'Gorduras', 'Laticínios', 'Temperos'];

  ingredients: Ingredient[] = [
    {
      id: 'acucar',
      name: 'Açúcar Refinado',
      icon: '🧂',
      category: 'Adoçantes',
      substitutes: [
        { name: 'Mel de Abelha', ratio: '1:1', benefits: 'Adoça naturalmente e possui antioxidantes', details: 'Use a mesma quantidade, mas reduza os líquidos da receita em 1/4.' },
        { name: 'Purê de Maçã', ratio: '1:1', benefits: 'Rico em fibras e vitaminas, reduz calorias', details: 'Ótimo para bolos e muffins. Substitui o açúcar e parte da gordura.' },
        { name: 'Adoçante Estévia', ratio: '1/4 colher de chá para 1 colher de sopa de açúcar', benefits: 'Zero calorias e não eleva o índice glicêmico', details: 'Ideal para diabéticos. Dose com cuidado devido ao dulçor concentrado.' }
      ]
    },
    {
      id: 'farinha',
      name: 'Farinha de Trigo',
      icon: '🌾',
      category: 'Grãos / Farinhas',
      substitutes: [
        { name: 'Farinha de Aveia', ratio: '1:1', benefits: 'Rica em fibras solúveis que auxiliam na digestão', details: 'Perfeita para panquecas e bolos. Dá uma textura macia.' },
        { name: 'Farinha de Amêndoas', ratio: '1:1', benefits: 'Baixo carboidrato (Low Carb) e rica em gorduras boas', details: 'Requer um ovo adicional como ligante, pois não contém glúten.' },
        { name: 'Farinha de Arroz Integral', ratio: '1:1', benefits: 'Livre de glúten e mais leve para o estômago', details: 'Fica excelente em empanados e pães sem glúten.' }
      ]
    },
    {
      id: 'manteiga',
      name: 'Manteiga',
      icon: '🧈',
      category: 'Gorduras',
      substitutes: [
        { name: 'Azeite de Oliva', ratio: '3/4 da medida de manteiga', benefits: 'Gorduras monoinsaturadas saudáveis para o coração', details: 'Excelente para receitas salgadas e massas de torta.' },
        { name: 'Purê de Abacate', ratio: '1:1', benefits: 'Rico em potássio e gorduras saudáveis, reduz calorias', details: 'Ideal para brownies e receitas com chocolate. O sabor do abacate some ao assar.' },
        { name: 'Iogurte Grego Natural', ratio: '1:1', benefits: 'Adiciona proteína e reduz drasticamente a gordura', details: 'Deixa bolos extremamente úmidos e fofos.' }
      ]
    },
    {
      id: 'leite',
      name: 'Leite de Vaca',
      icon: '🥛',
      category: 'Laticínios',
      substitutes: [
        { name: 'Leite de Amêndoas', ratio: '1:1', benefits: 'Baixas calorias, sem lactose e sem colesterol', details: 'Excelente para shakes e receitas leves de café da manhã.' },
        { name: 'Leite de Aveia', ratio: '1:1', benefits: 'Consistência cremosa natural e rico em fibras', details: 'Substitui muito bem o leite em molhos brancos e receitas quentes.' },
        { name: 'Leite de Coco', ratio: '1:1', benefits: 'Gorduras boas de cadeia média e sabor tropical rico', details: 'Ideal para receitas doces, curries e cremes.' }
      ]
    },
    {
      id: 'sal',
      name: 'Sal Refinado',
      icon: '🧂',
      category: 'Temperos',
      substitutes: [
        { name: 'Sal de Ervas', ratio: '1:1', benefits: 'Reduz o consumo de sódio pela metade', details: 'Feito batendo sal grosso com ervas secas (orégano, alecrim, manjericão).' },
        { name: 'Ervas Aromáticas', ratio: 'A gosto', benefits: 'Zero sódio e realça os sabores dos alimentos', details: 'Adicione alho, cebola, manjericão e alecrim frescos para dar sabor.' },
        { name: 'Limão Espremido', ratio: 'Gotas a gosto', benefits: 'Vitamina C e acidez que realça o sabor natural', details: 'O ácido cítrico do limão ativa os mesmos receptores na língua que o sal.' }
      ]
    }
  ];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private accessibilityService: AccessibilityService
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      if (this.ingredients.length > 0) {
        this.selectedIngredient = this.ingredients[0];
      }
    }
  }

  get filteredIngredients(): Ingredient[] {
    return this.ingredients.filter(ing => {
      const matchesSearch = ing.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'Todos' || ing.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  selectIngredient(ingredient: Ingredient) {
    this.selectedIngredient = ingredient;
    this.accessibilityService.stopSpeaking();
  }

  speakIngredient() {
    if (!this.selectedIngredient) return;
    
    let text = `Ingrediente selecionado: ${this.selectedIngredient.name}. Categoria: ${this.selectedIngredient.category}. Substitutos recomendados: `;
    this.selectedIngredient.substitutes.forEach((sub, index) => {
      text += `Opção ${index + 1}: ${sub.name}, na proporção de ${sub.ratio}. Benefício: ${sub.benefits}. Dica: ${sub.details} `;
    });

    this.accessibilityService.speak(text);
  }

  stopVoice() {
    this.accessibilityService.stopSpeaking();
  }
}
